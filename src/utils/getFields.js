/**
 * Returns an array of objects with selected keys only. Use inside of Array.map().
 * @param {arrray} fieldnames - List of fields we want to leave in.
 * @param {object} item - An object we iterate over (got it from Array.map()).
 */
export default (fieldnames = []) => item =>
  fieldnames.reduce(
    (previous, current) =>
      typeof item[current] === 'undefined' ? previous : { ...previous, [current]: item[current] },
    {}
  )
