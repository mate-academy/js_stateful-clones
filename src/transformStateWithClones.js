'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete newState[keyRemove];
        }
        break;

      case 'clear':
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;
    }

    resultArray.push(newState);
    currentState = newState;
  }

  return resultArray;
}

module.exports = transformStateWithClones;
