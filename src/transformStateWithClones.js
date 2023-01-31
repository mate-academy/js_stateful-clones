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

  for (const part in actions) {
    const action = actions[part];

    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action['extraData'],
        };
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
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
