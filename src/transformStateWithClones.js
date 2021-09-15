'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArr = [];
  let stateCopy = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...obj.extraData,
        };
        break;

      case 'removeProperties':
        for (const removeProp of obj.keysToRemove) {
          delete stateCopy[removeProp];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;
    }
    stateArr.push({ ...stateCopy });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
