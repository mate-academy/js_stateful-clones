'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentsState = { ...state };
  const stateHistory = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentsState = {};
        break;
      case 'addProperties':
        currentsState = { ...currentsState, ...action.extraData };
        break;
      case 'removeProperties':
        currentsState = { ...currentsState };

        action.keysToRemove.forEach((key) => {
          delete currentsState[key];
        });
        break;
    }
    stateHistory.push(currentsState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
