'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = Object.assign({}, state);

  for (const action of actions) {
    const newState = Object.assign({}, prevState);

    switch (action.type) {
      case 'addProperties':
        prevState = Object.assign({}, newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (Object.hasOwn(newState, key)) {
            delete newState[key];
          }
        }
        prevState = Object.assign({}, newState);
        break;

      case 'clear':
        prevState = {};
        break;
    }
    stateHistory.push(prevState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
