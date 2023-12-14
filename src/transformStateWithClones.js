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
        for (const entry of Object.entries(action.extraData)) {
          newState[entry[0]] = entry[1];
        }
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
