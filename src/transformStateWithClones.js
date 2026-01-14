'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloneObject = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCloneObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCloneObject[key];
        }

        break;

      case 'clear':
        for (const key in stateCloneObject) {
          delete stateCloneObject[key];
        }
        break;

      default:
        break;
    }

    stateClones.push({ ...stateCloneObject });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
