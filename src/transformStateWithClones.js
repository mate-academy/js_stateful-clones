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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        previuosVersions.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key in actions[i].keysToRemove) {
          delete stateCopy[actions[i].keysToRemove[key]];
        }
        previuosVersions.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        previuosVersions.push({});
        break;

      default:
        throw new Error('Wrong type');
    }
  }

  return previuosVersions;
}

module.exports = transformStateWithClones;
