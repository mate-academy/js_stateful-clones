'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const States = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(keyToRemove)) {
            delete stateCopy[keyToRemove];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        stateCopy = {};
        break;
    }

    States.push({ ...stateCopy });
  }

  return States;
}
module.exports = transformStateWithClones;
