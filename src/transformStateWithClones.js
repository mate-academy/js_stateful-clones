'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let stateCopy = { ...initialState };

  for (const action of actions) {
    let newState = { ...stateCopy };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
    }

    stateHistory.push(newState);
    stateCopy = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
