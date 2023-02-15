'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let previousState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        previousState = { ...previousState };
        Object.assign(previousState, action.extraData);
        stateArray.push(previousState);
        break;
      }

      case 'removeProperties': {
        previousState = { ...previousState };
        action.keysToRemove.forEach(key => delete previousState[key]);
        stateArray.push(previousState);
        break;
      }

      case 'clear': {
        previousState = {};
        stateArray.push(previousState);
        break;
      }

      default:
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
