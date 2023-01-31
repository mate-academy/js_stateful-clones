'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]} stateArray
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let stateCopy = {
    ...state,
  };

  for (const part of actions) {
    switch (part.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...part.extraData,
        };
        stateArray.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const removeElement of part.keysToRemove) {
          delete stateCopy[removeElement];
        }
        stateArray.push({ ...stateCopy });
        break;

      case 'clear':
        // for (const key in stateCopy) {
        //   delete stateCopy[key];
        // }
        // stateArray.push({ ...stateCopy });
        stateCopy = {};
        stateArray.push({});

        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
