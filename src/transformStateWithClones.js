'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      const { extraData } = action;

      Object.assign(currentState, extraData);
    } else if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    } else if (type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    resultArray.push({ ...currentState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
