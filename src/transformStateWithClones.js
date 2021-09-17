'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clone = Object.assign(clone, action.extraData);
        break;

      case 'removeProperties': {
        for (const i of action.keysToRemove) {
          delete clone[i];
        };
        break;
      }

      case 'clear': {
        for (const i in clone) {
          delete clone[i];
        };
        break;
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
