'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsHistory = [];
  let currentState = state;

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    actionsHistory.push(stateCopy);
    currentState = stateCopy;
  }

  return actionsHistory;
}

module.exports = transformStateWithClones;
