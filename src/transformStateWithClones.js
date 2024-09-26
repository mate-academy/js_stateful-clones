'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        for (const keyToClear in copyState) {
          delete copyState[keyToClear];
        }
        break;

      default:
        return 'Error!';
    }
    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
