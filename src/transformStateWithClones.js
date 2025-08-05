'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  let stateHistory = []
for (const action of actions) {
let nextState = { ...prevState };
stateHistory.push(nextState);
prevState = nextState;
}
  switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
        stateHistory.push(nextState);
        prevState = nextState;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        stateHistory.push(nextState);
        prevState = nextState;
        break;
      case 'clear':
        for (const key in nextState) {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        }
        stateHistory.push(nextState);
        break;
      default:
        break;
    }
  return stateHistory;
}
module.exports = transformStateWithClones;
