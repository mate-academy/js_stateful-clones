'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [Object.assign({}, state)];

  actions.forEach(action => {
    const nextState = Object.assign({}, stateHistory[stateHistory.length - 1]);

    switch (action.type) {
      case 'clear':
        return stateHistory.push({});
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete nextState[key]);
        break;
      default:
        break;
    }

    stateHistory.push(nextState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
