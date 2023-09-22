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
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        for (const i in stateCopy) {
          delete stateCopy[i];
        }
        break;
    }
    addNewState(stateCopy);
  }

  function addNewState(stateNewCopy) {
    resultArray.push({ ...stateCopy });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
