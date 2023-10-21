'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        current = {
          ...current, ...action.extraData,
        };
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete current[key];
        }
        break;
      }

      case 'clear': {
        current = {};
        break;
      }

      default: {
        break;
      }
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;
