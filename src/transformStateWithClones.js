'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const objsAfterActions = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        const propForAdd = Object.entries(extraData);

        for (const [key, value] of propForAdd) {
          stateCopy[key] = value;
        }
        break;

      case 'removeProperties':
        for (const propForRemove of keysToRemove) {
          if (stateCopy.hasOwnProperty(propForRemove)) {
            delete stateCopy[propForRemove];
          }
        }
        break;

      case 'clear':
        for (const element in stateCopy) {
          delete stateCopy[element];
        }
        break;
    }
    objsAfterActions.push({ ...stateCopy });
  }

  return objsAfterActions;
}

module.exports = transformStateWithClones;
