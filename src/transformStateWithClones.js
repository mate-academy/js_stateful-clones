'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  const objectClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objectClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objectClone[key];
        }
        break;

      case 'clear':
        for (const key in objectClone) {
          delete objectClone[key];
        }
        break;

      default:
        throw new Error('Incorrect data');
    }
    stateClone.push({ ...objectClone });
  }

  return stateClone;
}

module.exports = transformStateWithClones;
