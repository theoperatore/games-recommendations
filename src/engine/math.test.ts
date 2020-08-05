import { intersection, union, jaccard, unionAll } from './math';

test('intersection (basic)', () => {
  const setA = new Set(['A', 'B', 'C']);
  const SetB = new Set(['C', 'D', 'E']);
  const expected = new Set(['C']);

  expect(intersection(setA, SetB)).toEqual(expected);
});

test('intersection (none)', () => {
  const setA = new Set([]);
  const SetB = new Set(['C']);
  const expected = new Set([]);

  expect(intersection(setA, SetB)).toEqual(expected);
});

test('intersection (empty)', () => {
  const setA = new Set([]);
  const SetB = new Set([]);
  const expected = new Set([]);

  expect(intersection(setA, SetB)).toEqual(expected);
});

test('union (basic)', () => {
  const setA = new Set(['A', 'B', 'C']);
  const SetB = new Set(['C', 'D', 'E']);
  const expected = new Set(['A', 'B', 'C', 'D', 'E']);

  expect(union(setA, SetB)).toEqual(expected);
});

test('unionAll (basic)', () => {
  const setA = new Set(['A', 'B', 'C']);
  const setB = new Set(['C', 'D', 'E']);
  const setC = new Set(['C', 'D', 'E', 'F']);
  const expected = new Set(['A', 'B', 'C', 'D', 'E', 'F']);

  expect(unionAll(setA, setB, setC)).toEqual(expected);
});

test('unionAll (empty)', () => {
  const expected = new Set();
  expect(unionAll()).toEqual(expected);
});

test('unionAll (single set)', () => {
  const setA = new Set(['A', 'B', 'C']);
  const expected = new Set(['A', 'B', 'C']);

  expect(unionAll(setA)).toEqual(expected);
});

test('union (empty)', () => {
  const setA = new Set([]);
  const SetB = new Set([]);
  const expected = new Set([]);

  expect(union(setA, SetB)).toEqual(expected);
});

test('jaccard (empty)', () => {
  const setA = new Set([]);
  const SetB = new Set([]);

  expect(jaccard(setA, SetB)).toEqual(1);
});

test('jaccard (fully similar)', () => {
  const setA = new Set(['A', 'B']);
  const SetB = new Set(['A', 'B']);

  expect(jaccard(setA, SetB)).toEqual(1);
});

test('jaccard (fully dissimilar)', () => {
  const setA = new Set(['A', 'B']);
  const SetB = new Set(['C', 'D']);

  expect(jaccard(setA, SetB)).toEqual(0);
});

test('jaccard (computation)', () => {
  const setA = new Set(['A', 'B']);
  const SetB = new Set(['B', 'C', 'D']);

  expect(jaccard(setA, SetB)).toEqual(0.25);
});

test('user similarity (equal)', () => {
  const userA = {
    positives: new Set(['A', 'B']),
    negatives: new Set(['C', 'D']),
  };
  const userB = {
    positives: new Set(['A', 'B']),
    negatives: new Set(['C', 'D']),
  };

  const intPos = intersection(userA.positives, userB.positives).size;
  const intNeg = intersection(userA.negatives, userB.negatives).size;
  const conflictA = intersection(userA.positives, userB.negatives).size;
  const conflictB = intersection(userB.positives, userA.negatives).size;

  const total = unionAll(
    userA.positives,
    userA.negatives,
    userB.positives,
    userB.negatives,
  ).size;

  const output = (intPos + intNeg - conflictA - conflictB) / total;

  expect(output).toBe(1);
});

test('user similarity (no similar)', () => {
  const userA = {
    positives: new Set(['W', 'X']),
    negatives: new Set(['Y', 'Z']),
  };
  const userB = {
    positives: new Set(['A', 'B']),
    negatives: new Set(['C', 'D']),
  };

  const intPos = intersection(userA.positives, userB.positives).size;
  const intNeg = intersection(userA.negatives, userB.negatives).size;
  const conflictA = intersection(userA.positives, userB.negatives).size;
  const conflictB = intersection(userB.positives, userA.negatives).size;

  const total = unionAll(
    userA.positives,
    userA.negatives,
    userB.positives,
    userB.negatives,
  ).size;

  const output = (intPos + intNeg - conflictA - conflictB) / total;

  expect(output).toBe(0);
});

test('user similarity (conflicting)', () => {
  const userA = {
    positives: new Set(['C', 'D']),
    negatives: new Set(['A', 'B']),
  };
  const userB = {
    positives: new Set(['A', 'B']),
    negatives: new Set(['C', 'D']),
  };

  const intPos = intersection(userA.positives, userB.positives).size;
  const intNeg = intersection(userA.negatives, userB.negatives).size;
  const conflictA = intersection(userA.positives, userB.negatives).size;
  const conflictB = intersection(userB.positives, userA.negatives).size;

  const total = unionAll(
    userA.positives,
    userA.negatives,
    userB.positives,
    userB.negatives,
  ).size;

  const output = (intPos + intNeg - conflictA - conflictB) / total;

  expect(output).toBe(-1);
});
