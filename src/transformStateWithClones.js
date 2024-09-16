'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        for (const addItem in action.extraData) {
          newState[addItem] = action.extraData[addItem];
        }
        break;
      }

      case 'removeProperties': {
        for (const removeItem of action.keysToRemove) {
          delete newState[removeItem];
        }
        break;
      }

      case 'clear': {
        for (const st in newState) {
          delete newState[st];
        }
        break;
      }
    }

    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
