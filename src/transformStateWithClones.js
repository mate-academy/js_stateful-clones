'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {};

  Object.assign(copyState, state);

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        for (const index in extraData) {
          copyState[index] = extraData[index];
        }
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const index in keysToRemove) {
          delete copyState[keysToRemove[index]];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        return result;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
