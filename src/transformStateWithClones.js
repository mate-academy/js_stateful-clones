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
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        stateArray.push({ ...stateCopy });

        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        stateArray.push({ ...stateCopy });

        break;

      case 'removeProperties':

        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }

        stateArray.push({ ...stateCopy });
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
