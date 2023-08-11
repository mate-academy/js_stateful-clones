'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allActionsResults = [];
  const actionResult = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ('addProperties'):
        Object.assign(actionResult, extraData);

        break;

      case ('removeProperties'):
        for (const keyToRemove of keysToRemove) {
          if (actionResult.hasOwnProperty(keyToRemove)) {
            delete actionResult[keyToRemove];
          }
        }

        break;

      case ('clear'):
        for (const stateCopyKey in actionResult) {
          delete actionResult[stateCopyKey];
        }

        break;

      default:
        return 'ERROR';
    }

    allActionsResults.push({ ...actionResult });
  }

  return allActionsResults;
}

module.exports = transformStateWithClones;
