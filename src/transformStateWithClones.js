'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const historyStates = [];

  for (const action of actions) {
    const nextState = { ...prevState };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(nextState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in nextState) {
          delete nextState[key];
        }
        break;
      }

      default: {
        return { ...state };
      }
    }

    historyStates.push(nextState);
    prevState = { ...nextState };
  }

  return historyStates;
}

module.exports = transformStateWithClones;
