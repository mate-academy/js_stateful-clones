'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = Object.assign({}, state);
  const actionLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    actionLog.push(Object.assign({}, clone));
  }

  return actionLog;
}

module.exports = transformStateWithClones;
