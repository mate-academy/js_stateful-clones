'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedObject = { ...state };
  const stateWithClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedObject = {
          ...clonedObject,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedObject[key];
        }
        break;
      case 'clear':
        for (const key in clonedObject) {
          delete clonedObject[key];
        }
        break;
      default:
        throw Error('Error');
    }
    stateWithClones.push({ ...clonedObject });
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
