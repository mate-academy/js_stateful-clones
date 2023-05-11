'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error('invalid type of actions');
    }

    result.push({ ...stateCopy });
  });

  return result;
}

function removeProperties(copy, listOfKeys) {
  for (const key of listOfKeys) {
    delete copy[key];
  }
}

module.exports = transformStateWithClones;
