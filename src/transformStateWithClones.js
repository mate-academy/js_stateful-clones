'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObj = { ...state };
  const resultStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          resultObj[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete resultObj[action.keysToRemove[key]];
        }

        break;

      case 'clear':
        for (const key in resultObj) {
          delete resultObj[key];
        }

        break;

      default:
        return 'Wrong type of transformState';
    }

    resultStates.push({ ...resultObj });
  }

  return resultStates;
}

module.exports = transformStateWithClones;
