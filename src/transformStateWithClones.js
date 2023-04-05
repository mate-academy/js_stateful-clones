'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = {
    ...state,
  };
  const stateVersions = [];

  for (let i = 0; i < actions.length; i++) {
    const actionsItem = actions[i];

    switch (actionsItem.type) {
      case 'addProperties':
        for (const key in actionsItem.extraData) {
          stateClone[key] = actionsItem.extraData[key];
        }
        break;

      case 'removeProperties':
        for (let a = 0; a < actionsItem.keysToRemove.length; a++) {
          delete stateClone[actionsItem.keysToRemove[a]];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('Unexpected command');
    }

    stateVersions.push({
      ...stateClone,
    });
  }

  return stateVersions;
}
module.exports = transformStateWithClones;
