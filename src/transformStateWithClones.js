'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  actions.forEach((action) => {
    const prevState =
      stateHistory[stateHistory.length - 1] || Object.assign({}, state);
    const nextState = Object.assign({}, prevState);

    switch (action.type) {
      case 'clear':
        stateHistory.push({});

        return; // Exit the loop after clear action
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;
      default:
        break;
    }

    stateHistory.push(nextState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
