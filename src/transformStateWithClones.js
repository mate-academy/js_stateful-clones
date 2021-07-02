'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };

  const actionsLog = [];

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        Object.assign(stateClone, value.extraData);
        break;

      case 'removeProperties':

        for (const keys of value.keysToRemove) {
          delete stateClone[keys];
        }

        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
    }

    actionsLog.push({ ...stateClone });
  }

  return actionsLog;
}

module.exports = transformStateWithClones;
