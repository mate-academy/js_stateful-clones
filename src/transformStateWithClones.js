'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];

  for (const action of actions) {
    let transformResult;

    if (transformHistory.length > 0) {
      transformResult = { ...transformHistory.at(-1) };
    } else {
      transformResult = { ...state };
    }

    if (action.type === 'addProperties') {
      Object.assign(transformResult, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete transformResult[key];
      }
    }

    if (action.type === 'clear') {
      for (const field in transformResult) {
        delete transformResult[field];
      }
    }

    transformHistory.push(transformResult);
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
