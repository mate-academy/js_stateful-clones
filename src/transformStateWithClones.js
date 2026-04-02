'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unknown action type');
    }

    // if (action.type === 'addProperties') {
    //   for (const key in action.extraData) {
    //     copyState[key] = action.extraData[key];
    //   }
    // }

    // if (action.type === 'removeProperties') {
    //   for (const key of action.keysToRemove) {
    //     delete copyState[key];
    //   }
    // }

    // if (action.type === 'clear') {
    //   for (const key in copyState) {
    //     delete copyState[key];
    //   }
    // }
    stateHistory.push(Object.assign({}, currentState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
