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
    const stateCloneCopy = {};

    switch (value.type) {
      case 'addProperties':
        Object.assign(stateCloneCopy, stateClone);
        Object.assign(stateCloneCopy, value.extraData);
        actionsLog.push(stateCloneCopy);
        Object.assign(stateClone, stateCloneCopy);
        break;

      case 'removeProperties':
        Object.assign(stateCloneCopy, stateClone);

        for (const keys of value.keysToRemove) {
          delete stateCloneCopy[keys];
          delete stateClone[keys];
        }

        actionsLog.push(stateCloneCopy);
        Object.assign(stateClone, stateCloneCopy);
        break;

      case 'clear':
        actionsLog.push(stateCloneCopy);

        for (const key in stateClone) {
          delete stateClone[key];
        }
    };
  }

  return actionsLog;
}

module.exports = transformStateWithClones;
