'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const arrOfActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (stateCopy[key]) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        if (stateCopy) {
          for (const key in stateCopy) {
            delete stateCopy[key];
          }
        }
    }
    arrOfActions.push({ ...stateCopy });
  }

  return arrOfActions;
}

module.exports = transformStateWithClones;
