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
        clonedObject = { ...clonedObject };

        for (const key of action.keysToRemove) {
          delete clonedObject[key];
        }
        break;
      case 'clear':
        clonedObject = {};
        break;
      default:
        return 'Error';
    }
    stateWithClones.push(clonedObject);
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
