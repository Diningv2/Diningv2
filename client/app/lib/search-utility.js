import Fuse from 'fuse.js';

const defaultOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 40,
  maxPatternLength: 10,
  minMatchCharLength: 3
}
/**
 * Searches an array of objects and returns
 * an array with elements whose key values
 * match the given query
 *
 * @param {*} query The search term
 * @param {*} array The array of objects
 * @param {*} keysToSearchArray The key to do your search on
 * in the array of objects (often would be ['name'])
 * @returns an array of objects whose elements
 * match the search term
 */
export function search(query, array, keysToSearchArray) {
  const specificOptions = {...defaultOptions, keys: keysToSearchArray || []}
  var fuse = new Fuse(array, specificOptions);
  return fuse.search(query)
}