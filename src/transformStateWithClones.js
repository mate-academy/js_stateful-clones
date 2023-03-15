'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const objectsAfterEditing = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear' :
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        return Error;
    }

    objectsAfterEditing.push({ ...copyState });
  }

  return objectsAfterEditing;
}

module.exports = transformStateWithClones;
