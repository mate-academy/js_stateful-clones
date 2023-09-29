'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = { ...state };
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(result, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete result[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in result) {
          delete result[key];
        }
        break;
    }

    array.push({ ...result });
  }

  return array;
}

module.exports = transformStateWithClones;
