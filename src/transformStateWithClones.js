'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const retState = [ { ...state } ];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      for (const key in retState[i]) {
        delete retState[i][key];
      }
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(retState[i], actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete retState[i][actions[i].keysToRemove[j]];
      }
    }

    if (i !== (actions.length - 1)) {
      retState.push({ ...retState[i] });
    }
  }

  return retState;
}

module.exports = transformStateWithClones;
