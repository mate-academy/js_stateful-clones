'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 **/
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    let nextState;

    switch (type) {
      case 'addProperties':
        nextState = {
          ...currentState, ...action.extraData,
        };
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        nextState = currentState;
        break;
    }

    result.push(nextState);
    currentState = { ...nextState };
  }

  return result;
}

module.exports = transformStateWithClones;
