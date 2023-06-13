'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const previuosVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Wrong type');
    }

    previuosVersions.push({ ...stateCopy });
  }

  return previuosVersions;
}

module.exports = transformStateWithClones;
