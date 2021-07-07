'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = { ...state };
  const arr = [];

  for (const key of transforms) {
    switch (key.operation) {
      case 'addProperties':
        Object.assign(obj, key.properties);
        break;

      case 'clear':
        for (const clear in obj) {
          delete obj[clear];
        }
        break;

      case 'removeProperties':
        for (const remove of key.properties) {
          delete obj[remove];
        }
        break;
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
