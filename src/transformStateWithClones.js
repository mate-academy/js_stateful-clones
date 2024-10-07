'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [state];

  actions.forEach((action) => {
    let newState;

    const prevState = { ...stateHistory[stateHistory.length - 1] };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...prevState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...prevState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        newState = prevState;
        break;
    }
    stateHistory.push(newState);
  });
  stateHistory.shift();

  return stateHistory;
}

module.exports = transformStateWithClones;
