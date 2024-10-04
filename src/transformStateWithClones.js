'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionTypes = [];
  let REPEAT = false;

  for (const action of actions) {
    if (!actionTypes.includes(action.type)) {
      actionTypes.push(action.type);
    }
  }

  if (actionTypes.length === 1) {
    REPEAT = true;
  }

  const currentState = { ...state };
  const stateHistory = [];
  const extraData = {};
  const keysToRemove = [];

  for (let i = 0; i < actions.length; i++) {
    let copyState = {};

    switch (actions[i].type) {
      case 'addProperties':
        if (REPEAT) {
          Object.assign(extraData, actions[i].extraData);
        } else {
          Object.assign(currentState, actions[i].extraData);
          copyState = { ...currentState };
          stateHistory.push(copyState);
        }
        break;

      case 'removeProperties':
        if (REPEAT) {
          keysToRemove.push(actions[i].keysToRemove);
        } else {
          actions[i].keysToRemove.forEach((key) => {
            delete currentState[key];
          });
          copyState = { ...currentState };
          stateHistory.push(copyState);
        }
        break;

      case 'clear':
        if (!REPEAT) {
          Object.keys(currentState).forEach((key) => {
            delete currentState[key];
          });
          copyState = { ...currentState };
          stateHistory.push(copyState);
        }
        break;

      default:
        Error(`Unknown action type: ${actions[i].type}`);
    }
  }

  if (REPEAT) {
    switch (actionTypes[0]) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        stateHistory.push(currentState);
        break;

      case 'removeProperties':
        keysToRemove[0].forEach((key) => {
          delete currentState[key];
        });
        stateHistory.push(currentState);
        break;

      case 'clear':
        Object.keys(currentState).forEach((key) => {
          delete currentState[key];
        });
        stateHistory.push(currentState);
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
