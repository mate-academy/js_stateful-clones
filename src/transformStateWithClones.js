'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let prevState = { ...state };

  for (const action of actions) {
    let stepResult = { ...prevState };

    if (action.type === 'addProperties') {
      stepResult = {
        ...stepResult,
        ...action.extraData,
      };

      result.push(stepResult);

      prevState = { ...stepResult };
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (stepResult[key]) {
          delete stepResult[key];
        }
      }

      result.push(stepResult);

      prevState = { ...stepResult };
    }

    if (action.type === 'clear') {
      stepResult = {};

      result.push(stepResult);

      prevState = { ...stepResult };
    }
  }

  return result;
}

module.exports = transformStateWithClones;
