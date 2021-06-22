'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  const arrayOfObj = [];
  const objOfProparties = { ...state };

  for (let i = 0; i < action.length; i++) {
    switch (action[i].type) {
      case 'addProperties' :
        for (const key in action[i].extraData) {
          objOfProparties[key] = action[i].extraData[key];
        }
        break;

      case 'removeProperties' :
        for (let j = 0; j < action[i].keysToRemove.length; j++) {
          delete objOfProparties[action[i].keysToRemove[j]];
        }
        break;

      case 'clear' :
        for (const key in objOfProparties) {
          delete objOfProparties[key];
        }
        break;
    }
    arrayOfObj.push({ ...objOfProparties });
  }

  return arrayOfObj;
}

module.exports = transformStateWithClones;
