import fetch from 'isomorphic-unfetch';
const GB_TOKEN = '10ca95fa321e0917876b3ccd8d3668f30d829627';

type GameResponse = {
  id: string;
  image: {
    super_url?: string;
    screen_url?: string;
    medium_url?: string;
    small_url?: string;
    thumb_url?: string;
    icon_url?: string;
    tiny_url?: string;
  };
  name: string;
  deck: string;
  description: string;
  original_release_date?: string;
  site_detail_url: string;
  expected_release_day?: string;
  expected_release_month?: string;
  expected_release_year?: string;
  expected_release_quarter?: string;
};

export type Platform = {
  id: number;
  name: string;
};

const findGameMaxForPlatform = async (platform: Platform) => {
  const response = await fetch(
    `https://www.giantbomb.com/api/games?api_key=${GB_TOKEN}&format=json&platforms=${platform.id}&limit=1&field_list=id`,
    {
      headers: {
        'user-agent': 'gotd-1.0.0',
        'Content-Type': 'application/json',
      },
    },
  ).then((r) => r.json() as Promise<{ number_of_total_results: number }>);

  if (!response) {
    throw new Error('No response from GiantBomb for max games');
  }

  return response.number_of_total_results;
};

async function getSnesGame() {
  const response = await fetch(
    `https://www.giantbomb.com/api/games?api_key=${GB_TOKEN}&format=json&platforms=9&limit=1&guid=3030-9249`,
    {
      headers: {
        'user-agent': 'gotd-2.0.0',
        'Content-Type': 'application/json',
      },
    },
  );
  const parsed: { results: GameResponse[] } = await response.json();
  console.log(parsed.results);
}

// getSnesGame();
findGameMaxForPlatform({
  id: 9,
  name: 'Super Nintendo Entertainment System',
}).then(console.log);
