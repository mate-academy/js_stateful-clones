'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
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
        result.push({});
        prevState = { ...{} };

        break;

      default:
        throw new Error('uncertain action type');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
