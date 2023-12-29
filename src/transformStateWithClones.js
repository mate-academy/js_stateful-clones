'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;
      }

      case 'clear':
        clone = {};
    }

    array.push({ ...clone });
  }

  return array;
}

module.exports = transformStateWithClones;
