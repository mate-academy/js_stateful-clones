'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const tempState = {
    ...state,
  };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(tempState, extraData);
        break;

      case 'clear':
        for (const key in tempState) {
          delete tempState[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete tempState[key];
        }
        break;

      default:
        continue;
    }
    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
