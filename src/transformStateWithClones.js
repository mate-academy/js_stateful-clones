'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const addOperation = 'addProperties';
  const clearOperation = 'clear';
  const removeOperation = 'removeProperties';
  const resultingArray = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case addOperation:
        Object.assign(copyState, action.extraData);
        break;
      case clearOperation:
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      case removeOperation:
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
    }
    resultingArray.push({ ...copyState })
  }

  return resultingArray;
}

module.exports = transformStateWithClones;
