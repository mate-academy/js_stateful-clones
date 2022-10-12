'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let copiedState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copiedState[key] = action.extraData[key];
      }
      resultArray.push({ ...copiedState });
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete copiedState[keyToRemove];
      }
      resultArray.push({ ...copiedState });
    } else {
      copiedState = {};
      resultArray.push({});
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
