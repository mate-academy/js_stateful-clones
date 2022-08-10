'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const intermObj = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(intermObj, actions[i].extraData);
        stateHistory.push(Object.assign({}, intermObj));
        break;
      case 'removeProperties':
        for (const el of actions[i].keysToRemove) {
          delete intermObj[el];
        }
        stateHistory.push(Object.assign({}, intermObj));
        break;
      case 'clear':
        for (const key in intermObj) {
          delete intermObj[key];
        }
        stateHistory.push(Object.assign({}, intermObj));
        break;
      default:
        throw new Error('');
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
