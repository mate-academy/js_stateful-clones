'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(stateCopy, action.extraData);
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;
      default:
        throw new Error('wrong input');
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
