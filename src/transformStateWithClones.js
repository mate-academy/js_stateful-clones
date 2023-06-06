'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const nextState = Object.assign({}, clonedState, action.extraData);

        result.push(nextState);
        clonedState = nextState;
        break;
      }

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove;
        const nextState = Object.assign({}, clonedState);

        for (const key of keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        result.push(nextState);
        clonedState = nextState;
        break;
      }

      case 'clear': {
        const nextState = {};

        result.push(nextState);
        clonedState = nextState;
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
