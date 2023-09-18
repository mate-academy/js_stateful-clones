'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (states.length > 0) {
      currentState = { ...states[states.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        const data = action.extraData;

        for (const property in data) {
          currentState[property] = data[property];
        }
        break;

      case 'removeProperties':
        const removes = action.keysToRemove;

        for (const key of removes) {
          if (key in currentState) {
            delete currentState[key];
          }
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

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
