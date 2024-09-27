'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionLog = [];
  let workState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(workState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(workState, action.keysToRemove);
        break;

      case 'clear':
        workState = {};
        break;

      default:
        return 'Error!';
    }

    actionLog.push(workState);
    workState = Object.assign({}, workState);
  }

  return actionLog;
}

/**
 * @param {Object} obj
 * @param {String[]} keysToRemove
 */
function removeProperties(obj, keysToRemove) {
  for (const key of keysToRemove) {
    if (!(key in obj)) {
      continue;
    }

    delete obj[key];
  }
}

module.exports = transformStateWithClones;
