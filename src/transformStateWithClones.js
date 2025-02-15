'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateObject = [];

  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];
    let nextState = { ...currentState };

    switch (type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...nextState, ...extraData };
        break;

      case 'removeProperties':
        for (let j = 0; j < keysToRemove.length; j++) {
          delete nextState[keysToRemove[j]];
        }
        break;

      default:
        break;
    }

    stateObject.push(nextState);
    currentState = nextState;
  }

  return stateObject;
}

module.exports = transformStateWithClones;
