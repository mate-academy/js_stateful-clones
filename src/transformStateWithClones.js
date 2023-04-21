'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];

  const stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        for (const addData in action.extraData) {
          stateCopy[addData] = action.extraData[addData];
        }
        break;

      case 'removeProperties':
        for (const removeData of action.keysToRemove) {
          delete stateCopy[removeData];
        }
        break;

      case 'clear':
        if (Object.keys(stateCopy).length !== 0) {
          Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        }
        break;
    }
    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
