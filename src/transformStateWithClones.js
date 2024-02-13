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

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties': {
        Object.assign(newState, extraData);
        break;
      }

      case 'removeProperties': {
        for (let j = 0; j < keysToRemove.length; j++) {
          if (newState[keysToRemove[j]]) {
            delete newState[keysToRemove[j]];
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
        throw new Error(`Unhandled action type: ${type}`);
      }
    }

    resultArr.push({ ...newState }); // Pushing a clone of the modified state
  }

  return resultArr;
}

module.exports = transformStateWithClones;
