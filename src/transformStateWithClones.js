'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLog = [];
  const stateCopy = Object.assign({}, state);

  function addLogRecord(log) {
    stateLog.push(Object.assign({}, stateCopy));
  }

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        addLogRecord(stateCopy);
        break;

      case 'removeProperties':
        for (const property of action['keysToRemove']) {
          delete stateCopy[property];
        }
        addLogRecord(stateCopy);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        addLogRecord(stateCopy);
        break;

      default:
        return 'Error.';
    }
  }

  return stateLog;
}

module.exports = transformStateWithClones;
