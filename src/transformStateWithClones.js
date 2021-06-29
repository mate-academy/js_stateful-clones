'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = {};

  Object.assign(stateClone, state);

  const actionsLog = new Array(actions.length);

  for (let i = 0; i < actionsLog.length; i++) {
    actionsLog[i] = {};
  }

  for (let i = 0; i < actionsLog.length; i++) {
    if (actions[i].type === 'addProperties') {
      if (i === 0) {
        Object.assign(actionsLog[i], stateClone);
        Object.assign(actionsLog[i], actions[i].extraData);
      } else {
        Object.assign(actionsLog[i], actionsLog[i - 1]);
        Object.assign(actionsLog[i], actions[i].extraData);
      }
    }

    if (actions[i].type === 'removeProperties') {
      if (i === 0) {
        Object.assign(actionsLog[i], stateClone);

        for (const keys of actions[i].keysToRemove) {
          delete actionsLog[i][keys];
        }
      } else {
        Object.assign(actionsLog[i], actionsLog[i - 1]);

        for (const keys of actions[i].keysToRemove) {
          delete actionsLog[i][keys];
        }
      }
    }

    if (actions[i].type === 'clear') {
      actionsLog[i] = {};
    }
  }

  return actionsLog;
}

module.exports = transformStateWithClones;
