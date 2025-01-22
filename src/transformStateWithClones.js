'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newObj = { ...currentState };

    if (action.type === 'addProperties') {
      for (const value in action.extraData) {
        newObj[value] = action.extraData[value];
      }
    }

    if (action.type === 'removeProperties') {
      for (const value of action.keysToRemove) {
        delete newObj[value];
      }
    }

    if (action.type === 'clear') {
      for (const value in newObj) {
        delete newObj[value];
      }
    }
    result.push(newObj);
    currentState = newObj;
  }

  return result;
}

module.exports = transformStateWithClones;
