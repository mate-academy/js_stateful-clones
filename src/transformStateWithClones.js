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

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties': {
        for (const addItem in act.extraData) {
          newState[addItem] = act.extraData[addItem];
        }
        break;
      }

      case 'removeProperties': {
        for (const removeItem of act.keysToRemove) {
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
