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
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const propForRemove of keysToRemove) {
          if (stateCopy.hasOwnProperty(propForRemove)) {
            delete stateCopy[propForRemove];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    objsAfterActions.push({ ...stateCopy });
  }

  return objsAfterActions;
}

module.exports = transformStateWithClones;
