'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const versionsState = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(copyState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (const key2 of actions[i].keysToRemove) {
        if (key2 in copyState) {
          delete copyState[key2];
        }
      }
    } else if (actions[i].type === 'clear') {
      copyState = {};
    }

    versionsState.push({ ...copyState });
  }

  return versionsState;
}
module.exports = transformStateWithClones;
