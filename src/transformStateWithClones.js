'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' : Object.assign(newObject, action.extraData);
        break;
      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newObject[key];
        };
        break;

      case 'clear' :
        for (const key1 in newObject) {
          delete newObject[key1];
        }
        break;

      default : break;
    }
    resultArray.push({ ...newObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
