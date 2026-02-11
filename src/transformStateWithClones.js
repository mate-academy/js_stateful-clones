'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const statesHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);
        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete stateCopy[actions[i].keysToRemove[j]];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error('Unknown action type: ' + actions[i].type);
    }

    statesHistory.push(Object.assign({}, stateCopy));
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
