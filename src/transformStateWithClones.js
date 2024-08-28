'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const statesArr = [];
  let temp = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      temp = action.extraData;

      for (const key in temp) {
        tempState[key] = temp[key];
      }

      statesArr.push({ ...tempState });
    }

    if (action.type === 'removeProperties') {
      temp = action.keysToRemove;

      for (const rem of temp) {
        delete tempState[rem];
      }

      statesArr.push({ ...tempState });
    }

    if (action.type === 'clear') {
      for (const key in tempState) {
        delete tempState[key];
      }

      statesArr.push({ ...tempState });
    }
  }

  return statesArr;
}

module.exports = transformStateWithClones;
