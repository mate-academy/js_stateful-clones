'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
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
        throw new Error('Error');
    }
    states.push({ ...tempState });
  }

  return states;
}

module.exports = transformStateWithClones;
