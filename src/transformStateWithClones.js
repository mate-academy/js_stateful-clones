'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  let result = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      result = Object.assign(result, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete result[key];
      }
    }

    if (action.type === 'clear') {
      for (const clear in result) {
        delete result[clear];
      }
    }
    arrayResult.push({ ...result });
  }

  return arrayResult;
}
module.exports = transformStateWithClones;
