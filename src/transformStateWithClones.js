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
    switch (true) {
      case !!action.extraData:
        Object.assign(semyResult, action.extraData);
        break;

      case !!action.keysToRemove:
        for (const key of action.keysToRemove) {
          delete semyResult[key];
        };
        break;

      case (!action.extraData && !action.keysToRemove):
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
