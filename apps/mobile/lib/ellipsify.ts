export function ellipsify(str = '', len = 4, delimiter = '..') {
  return str.length < len * 2 + delimiter.length
    ? str
    : `${str.slice(0, len)}${delimiter}${str.slice(-len)}`
}
