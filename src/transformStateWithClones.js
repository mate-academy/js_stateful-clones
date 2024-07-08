'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { extraData, type, keysToRemove } = action;

    switch (type) {
      case 'clear':
        // eslint-disable-next-line no-const-assign
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error('Error');
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
