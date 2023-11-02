'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultsOfActions = [];
  let stateCopy = { ...state };

  for (const objectFromActionsArray of actions) {
    switch (objectFromActionsArray.type) {
      case 'addProperties':

        Object.assign(stateCopy, objectFromActionsArray.extraData);

        resultsOfActions.push({ ...stateCopy });
        break;
      case 'removeProperties':
        const keyNamesArray = objectFromActionsArray.keysToRemove;

        for (const keyName of keyNamesArray) {
          delete stateCopy[keyName];
        }
        resultsOfActions.push(Object.assign({}, stateCopy));
        break;

      case 'clear':
        const empty = {};

        stateCopy = empty;
        resultsOfActions.push({ ...stateCopy });
        break;
    }
  }

  return resultsOfActions;
}

module.exports = transformStateWithClones;
