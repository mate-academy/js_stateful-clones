'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':

        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }

        const removeCopy = { ...stateCopy };

        stateArray.push(removeCopy);
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => {
          delete stateCopy[key];
        });

        const clearCopy = { ...stateCopy };

        stateArray.push(clearCopy);
        break;
      case 'addProperties':
        for (const data of Object.keys(action.extraData)) {
          stateCopy[data] = action.extraData[data];
        }

        const addCopy = { ...stateCopy };

        stateArray.push(addCopy);
        break;
      default:
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
