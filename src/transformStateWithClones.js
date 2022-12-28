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
    switch (true) {
      case action.type === 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        break;

      case action.type === 'removeProperties' :
        for (const keys of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(keys)) {
            delete stateCopy[keys];
          };
        }
        break;

      case action.type === 'clear' :
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
