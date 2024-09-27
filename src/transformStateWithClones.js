'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateList = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const [addKey, addValue] of Object.entries(action.extraData)) {
          stateCopy[addKey] = addValue;
        }
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;

      case 'clear':
        for (const clearKeys of Object.keys(stateCopy)) {
          delete stateCopy[clearKeys];
        }
        break;

      default:
        throw new Error(`Action ${action.type} isn't allowed`);
    }

    stateList.push({ ...stateCopy });
  }

  return stateList;
}

module.exports = transformStateWithClones;
