export function intersection<T>(setA: Set<T>, setB: Set<T>) {
  const intersection = new Set<T>();
  for (const i of setB) {
    if (setA.has(i)) {
      intersection.add(i);
    }
  }

  return intersection;
}

/**
 *
 * @param setA first set to compare
 * @param setB second se to compare
 * @returns A set of all elements from both A and B
 */
export function union<T>(setA: Set<T>, setB: Set<T>) {
  const union = new Set(setA);
  for (const i of setB) {
    union.add(i);
  }

  return union;
}

/**
 *
 * @param sets varargs of sets to union
 * @returns Always a new set of the union of all input sets
 */
export function unionAll<T>(...sets: Set<T>[]) {
  if (sets.length === 0) return new Set<T>();
  if (sets.length === 1) return new Set(sets[0]);
  return sets.reduce((out, next) => union(out, next), new Set<T>());
}

/**
 * Computes the jaccard index for two sets; How similar are these sets?
 *
 * @param setA the first set to compare
 * @param setB the second set to compare
 * @returns number between 0 and 1; or 1 if both sets are empty
 */
export function jaccard<T>(setA: Set<T>, setB: Set<T>): number {
  if (setA.size === 0 && setB.size === 0) return 1;
  const unionSize = union(setA, setB).size;
  const intersectionSize = intersection(setA, setB).size;
  return intersectionSize / unionSize;
}
