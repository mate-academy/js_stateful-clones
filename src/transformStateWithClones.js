'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.entries(action.extraData).forEach(([key, value]) => {
          copy[key] = value;
        });
        break;

      case 'clear' :
        Object.keys(copy).forEach(key => {
          delete copy[key];
        });
        break;

      case 'removeProperties' :
        action.keysToRemove.forEach(key => {
          delete copy[key];
        });
        break;

      default :
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
