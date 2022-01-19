'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const objClone = Object.assign({}, state);

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties':
        Object.assign(objClone, properties);
        break;

      case 'removeProperties':
        for (const key of properties) {
          delete objClone[key];
        }
        break;

      case 'clear':
        for (const key in objClone) {
          delete objClone[key];
        }
        break;
    }

    arr.push(Object.assign({}, objClone));
  }

  return arr;
}

module.exports = transformStateWithClones;
