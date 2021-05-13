'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLog = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case action.type = 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }

        stateLog.push(newState);
        newState = { ...stateLog[stateLog.length - 1] };
        break;
      case action.type = 'removeProperties':
        for (const key of action.keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }

        stateLog.push(newState);
        newState = { ...stateLog[stateLog.length - 1] };
        break;
      case action.type = 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }

        stateLog.push(newState);
        newState = { ...stateLog[stateLog.length - 1] };
        break;
    }
  }

  return stateLog;
}

module.exports = transformStateWithClones;
