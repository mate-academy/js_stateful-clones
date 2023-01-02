'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const propAfterAction = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties' :
        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      case 'clear' :
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;

      default:
        throw new Error('Unexpected state');
    }

    propAfterAction.push({ ...stateCopy });
  }

  return propAfterAction;
}

module.exports = transformStateWithClones;
