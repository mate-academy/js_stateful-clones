'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      stateClone = {};
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(stateClone, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      const keyRemoval = actions[i].keysToRemove;

      keyRemoval.forEach(key => {
        delete stateClone[key];
      });
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
