/**
 * Checks that variable is React Ref
 * @param elem - any variable
 */
export function isRef(elem: unknown) {
  return typeof elem === 'object' && elem.hasOwnProperty('current');
}
