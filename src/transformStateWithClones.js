'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allActionsArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);

        break;

      case ('removeProperties'):
        for (const keyToRemove of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(keyToRemove)) {
            delete stateCopy[keyToRemove];
          }
        }

        break;

      case ('clear'):
        for (const stateCopyKey in stateCopy) {
          delete stateCopy[stateCopyKey];
        }

        break;

      default:
        return 'ERROR';
    }

    allActionsArray.push({ ...stateCopy });
  }

  return allActionsArray;
}

module.exports = transformStateWithClones;
