'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateClones = [];
  let nextState;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState };
        Object.assign(nextState, action.extraData);
        stateClones.push(nextState);
        currentState = nextState;
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        stateClones.push(nextState);
        currentState = nextState;
        break;

      case 'clear':
        nextState = {};
        stateClones.push(nextState);
        currentState = nextState;
        break;

      default:
        break;
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
