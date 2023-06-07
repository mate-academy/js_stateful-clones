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
  let nextState;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        nextState = Object.assign({}, clonedState, action.extraData);
        result.push(nextState);
        break;
      }

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove;

        nextState = Object.assign({}, clonedState);

        for (const key of keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        result.push(nextState);
        break;
      }

      case 'clear': {
        nextState = {};
        result.push(nextState);
        break;
      }
    }
    clonedState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
