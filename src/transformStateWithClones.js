'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newAction = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        stateCopy = {};
        break;
      }

      case 'addProperties': {
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      default:
        break;
    }

    newAction.push({ ...stateCopy });
  }

  return newAction;
}

module.exports = transformStateWithClones;
