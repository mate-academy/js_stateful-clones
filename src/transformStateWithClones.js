'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  const arrayOfObject = [];
  const objectOfProparties = { ...state };

  for (let i = 0; i < action.length; i++) {
    switch (action[i].type) {
      case 'addProperties' :
        for (const key in action[i].extraData) {
          objectOfProparties[key] = action[i].extraData[key];
        }
        break;

      case 'removeProperties' :
        for (let j = 0; j < action[i].keysToRemove.length; j++) {
          delete objectOfProparties[action[i].keysToRemove[j]];
        }
        break;

      case 'clear' :
        for (const key in objectOfProparties) {
          delete objectOfProparties[key];
        }
        break;
    }
    arrayOfObject.push({ ...objectOfProparties });
  }

  return arrayOfObject;
}

module.exports = transformStateWithClones;
