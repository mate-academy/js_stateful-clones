'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultActions = [];

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

      case 'clear':
        for (const element in stateCopy) {
          delete stateCopy[element];
        }
        break;

      default:
        break;
    }

    resultActions.push({ ...stateCopy });
  }

  return resultActions;
}

module.exports = transformStateWithClones;
