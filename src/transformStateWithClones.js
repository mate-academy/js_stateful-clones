'use strict';

// /**
//  * @param {Object} state
//  * @param {Object[]} actions
//  *
//  * @return {Object[]}
//  */

function transformStateWithClones(state, actions) {
  const cloneState = { ...state };

  const array = [];

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(cloneState, object.extraData);
        // array.push({ ...cloneState });
        break;

      case 'removeProperties':
        for (const keys of object.keysToRemove) {
          delete cloneState[keys];
        }
        // array.push({ ...cloneState });
        break;
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        // array.push({ ...cloneState });
        break;
      default:
        break;
    }
    array.push({ ...cloneState });
  }

  return array;
}

module.exports = transformStateWithClones;
