'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];

  let stateCopy = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        stateArray.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const removeElement of action.keysToRemove) {
          delete stateCopy[removeElement];
        }
        stateArray.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        stateArray.push({});
        break;
      default:
        throw stateCopy;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
