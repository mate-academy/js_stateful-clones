'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        copy = Object.assign(copy, object.extraData);
        break;
      case 'removeProperties':
        for (const obj of object.keysToRemove) {
          delete copy[obj];
        }
        break;
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }
    result.push(Object.assign({}, copy));
  }

  return result;
}

module.exports = transformStateWithClones;
