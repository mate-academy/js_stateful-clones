'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {
    ...state,
  };
  const stateVersions = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        stateClone[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (let a = 0; a < actions[i].keysToRemove.length; a++) {
        delete stateClone[actions[i].keysToRemove[a]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    stateVersions.push({
      ...stateClone,
    });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
