'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const semyResult = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(semyResult, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete semyResult[key];
        };
        break;

      case 'clear':
        for (const key in semyResult) {
          delete semyResult[key];
        };
        break;
    }

    const semyState = {};

    Object.assign(semyState, semyResult);
    result.push(semyState);
  }

  return result;
}

module.exports = transformStateWithClones;
