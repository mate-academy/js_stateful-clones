'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = { ...state };
  const finalResult = [];

  for (const action of actions) {
    result = { ...result };

    if (action.type === 'addProperties') {
      Object.assign(result, action.extraData);
    }

    if (action.type === 'clear') {
      result = {};
    }

    if (action.type === 'removeProperties') {
      for (const key of Object.keys(result)) {
        if (action.keysToRemove.includes(key)) {
          delete result[key];
        }
      }
    }
    finalResult.push(result);
  }

  return finalResult;
}

module.exports = transformStateWithClones;
