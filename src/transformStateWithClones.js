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
    switch (action.type) {
      case 'addProperties':
        const data = action.extraData;

        Object.assign(currentState, data);
        break;

      case 'removeProperties':
        const removes = action.keysToRemove;

        for (const key of removes) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const entry in currentState) {
          delete currentState[entry];
        }
        break;

      default:
        throw new Error('Non-existing action');
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
