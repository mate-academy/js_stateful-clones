'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        action.keysToRemove.map((removeKey) => delete stateCopy[removeKey]);

        break;

      case 'clear':
        Object.keys(stateCopy).map((key) => delete stateCopy[key]);

        break;

      default: return Error('Something went wrong');
    }

    actionsArray.push({ ...stateCopy });
  }

  return actionsArray;
}

module.exports = transformStateWithClones;
