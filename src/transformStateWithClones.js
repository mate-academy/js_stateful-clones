'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let curentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let nextState = { ...curentState };

    switch (action.type) {
      case 'addProperties':
        nextState = Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        for (const key in nextState) {
          if (Object.hasOwn(nextState, key)) {
            delete nextState[key];
          }
        }
        break;
    }

    curentState = nextState;
    stateHistory.push(curentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
