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

    switch (action.type) {
      case 'addProperties':
        stepResult = {
          ...stepResult,
          ...action.extraData,
        };

        result.push(stepResult);

        prevState = { ...stepResult };

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stepResult[key]) {
            delete stepResult[key];
          }
        }

        result.push(stepResult);

        prevState = { ...stepResult };

        break;

      case 'clear':
        stepResult = {};

        result.push(stepResult);

        prevState = { ...stepResult };

        break;

      default:
        throw Error;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
