'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        for (const prop in currentState) {
          if (currentState.hasOwnProperty(prop)) {
            delete currentState[prop];
          }
        }
        break;
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
