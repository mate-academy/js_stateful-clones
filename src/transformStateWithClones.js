'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        addNewState(stateCopy);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        addNewState(stateCopy);
        break;
      case 'clear':
        for (const i in stateCopy) {
          delete stateCopy[i];
        }
        addNewState(stateCopy);
        break;
      default:
        resultArray.push('You have an error');
        break;
    }
  }

  function addNewState(stateNewCopy) {
    resultArray.push({ ...stateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
