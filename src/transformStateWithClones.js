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
        Object.assign(stateClone, stateCloneCopy);
        break;

      case 'removeProperties':
        Object.assign(stateCloneCopy, stateClone);

        for (const keys of value.keysToRemove) {
          delete stateCloneCopy[keys];
          delete stateClone[keys];
        }

        Object.assign(stateClone, stateCloneCopy);
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
    };

    actionsLog.push(stateCloneCopy);
  }

  return actionsLog;
}

module.exports = transformStateWithClones;
