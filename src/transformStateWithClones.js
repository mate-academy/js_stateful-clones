'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const allChanges = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        allChanges.push({ ...stateCopy });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(element => {
          delete stateCopy[element];
        });
        allChanges.push({ ...stateCopy });
        break;

      case 'clear' :
        for (const properties in stateCopy) {
          delete stateCopy[properties];
        }
        allChanges.push({ ...stateCopy });
        break;
    }
  }

  return allChanges;
}

module.exports = transformStateWithClones;
