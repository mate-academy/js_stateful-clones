'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arrWithStateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const arr of action.keysToRemove) {
          delete stateClone[arr];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        return 'Something wrong...';
    }

    arrWithStateVersions.push({ ...stateClone });
  }

  return arrWithStateVersions;
}

module.exports = transformStateWithClones;
