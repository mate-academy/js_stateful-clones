'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          clone[key] = action.extraData[key];
        };

        result.push({ ...clone });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }

        result.push({ ...clone });

        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }

        result.push({ ...clone });

        break;

      default:
        // do nothing
    }
  }

  return result;
}

module.exports = transformStateWithClones;
