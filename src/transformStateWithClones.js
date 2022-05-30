'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionPlus = [];
  let copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(copyState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete copyState[actions[i].keysToRemove[j]];
      }
    }

    if (actions[i].type === 'clear') {
      copyState = {};
    }
    actionPlus.push({ ...copyState });
  }

  return actionPlus;
}

module.exports = transformStateWithClones;
