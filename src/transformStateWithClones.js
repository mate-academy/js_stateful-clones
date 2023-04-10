'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const objsAfterActions = [];

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      stateCopy = { ...stateCopy };

      const propForAdd = Object.entries(extraData);

      for (const [key, value] of propForAdd) {
        stateCopy[key] = value;
      }
      objsAfterActions.push(stateCopy);
    }

    if (type === 'removeProperties') {
      stateCopy = { ...stateCopy };

      for (const propForRemove of keysToRemove) {
        if (stateCopy.hasOwnProperty(propForRemove)) {
          delete stateCopy[propForRemove];
        }
      }
      objsAfterActions.push(stateCopy);
    }

    if (type === 'clear') {
      stateCopy = { ...stateCopy };

      for (const element in stateCopy) {
        delete stateCopy[element];
      }
      objsAfterActions.push(stateCopy);
    }
  }

  return objsAfterActions;
}

module.exports = transformStateWithClones;
