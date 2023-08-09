'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];

  for (const action of actions) {
    const { type } = action;
    const currentState = { ...resultArray[resultArray.length - 1] || state };

    if (type === 'addProperties') {
      const { extraData } = action;

      Object.assign(currentState, extraData);
    } else if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    } else if (type === 'clear') {
      for (const key in currentState) {
        if (currentState.hasOwnProperty(key)) {
          delete currentState[key];
        }
      }
    }

    resultArray.push(currentState);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
