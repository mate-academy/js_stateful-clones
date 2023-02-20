'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          stateClone[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in stateClone) {
            delete stateClone[key];
          }
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error(`Unknown action type: "${type}"`);
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
