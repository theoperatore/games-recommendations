import fetch from 'isomorphic-unfetch';
import fs from 'fs';
import path from 'path';
import { Platform, platforms } from './platforms';

const { GB_TOKEN } = process.env;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getGame(
  stream: fs.WriteStream,
  pid: number,
  offset: number,
  limit: number = 1,
) {
  try {
    const response = await fetch(
      `https://www.giantbomb.com/api/games?api_key=${GB_TOKEN}&format=json&platforms=${pid}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          'user-agent': 'alorg-game-recommendations-0.0.1',
          'Content-Type': 'application/json',
        },
      },
    );
    const body = await response.json();
    if (body.results.length > 0) {
      body.results.forEach((result: any) => {
        stream.write(JSON.stringify(result));
        stream.write('\n');
      });
      console.log(offset);
    } else {
      console.error(body);
    }
  } catch (error) {
    console.error(error);
  }
  await delay(1000);
}

const getMaxOffset = async (pid: number) => {
  const response = await fetch(
    `https://www.giantbomb.com/api/games?api_key=${GB_TOKEN}&format=json&platforms=${pid}&limit=1&field_list=id`,
    {
      headers: {
        'user-agent': 'alorg-game-recommendations-0.0.1',
        'Content-Type': 'application/json',
      },
    },
  ).then((r) => r.json() as Promise<{ number_of_total_results: number }>);

  if (!response) {
    throw new Error('No response from GiantBomb for max games');
  }

  return response.number_of_total_results;
};

type JobConfig = {
  platform: Platform;
  batchSize: number;
};
async function download(config: JobConfig) {
  const { platform, batchSize } = config;
  const max = await getMaxOffset(platform.id);
  console.log('Max Offset', max);
  const file = path.resolve(__dirname, 'dumps', platform.db);

  const stream = fs.createWriteStream(file, { encoding: 'utf8' });

  let i = 0;
  let limit = batchSize;
  while (i <= max) {
    await getGame(stream, platform.id, i, limit);
    i += limit;
  }

  stream.close();
  console.log('done', platform.name, platform.db);
}

// snes -- from any network call
const config: JobConfig = {
  batchSize: 10,
  platform: platforms[1],
};

download(config);
