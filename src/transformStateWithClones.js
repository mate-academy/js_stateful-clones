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
    switch (action.type) {
      case ('addProperties'):
        Object.assign(actionResult, action.extraData);

        break;

      case ('removeProperties'):
        for (const keyToRemove of action.keysToRemove) {
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
