'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const resultArray = [];

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties': {
        Object.assign(currentState, item.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of item.keysToRemove) {
          delete currentState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      }
    }

    resultArray.push({ ...currentState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
