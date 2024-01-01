'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const resultArr = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(newState, actions[i].extraData);
        break;
      }

      case 'removeProperties': {
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          if (newState[actions[i].keysToRemove[j]]) {
            delete newState[actions[i].keysToRemove[j]];
          }
        }
        break;
      }

      case 'clear': {
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;
      }

      default: {
        throw new Error(`Unhandled action type: ${actions[i].type}`);
      }
    }

    resultArr.push({ ...newState }); // Pushing a clone of the modified state
  }

  return resultArr;
}

module.exports = transformStateWithClones;
