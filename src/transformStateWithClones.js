'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let presentState = { ...state };

  if (actions.length === 0) {
    return stateHistory;
  }

  for (const action of actions) {
    const secondState = { ...presentState };

    switch (action.type) {
      case 'clear':
        for (const key in secondState) {
          delete secondState[key];
        }
        break;
      case 'addProperties':
        Object.assign(secondState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (secondState.hasOwnProperty(key)) {
            delete secondState[key];
          }
        }
        break;
      default:
        break;
    }

    stateHistory.push(secondState);
    presentState = { ...secondState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
