'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allVersions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const states of action.keysToRemove) {
          delete stateCopy[states];
        }
        break;

      case 'clear':
        for (const states in stateCopy) {
          delete stateCopy[states];
        }
        break;

      default:
        break;
    }

    allVersions.push({ ...stateCopy });
  }

  return allVersions;
}
module.exports = transformStateWithClones;
