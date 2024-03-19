"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    let nextState = { ...currentState };

    switch (action.type) {
      case "clear":
        nextState = {};
        break;
      case "addProperties":
        Object.assign(nextState, action.extraData);
        break;
      case "removeProperties":
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;
      default:
        throw new Error("Unknown action type: " + action.type);
    }

    stateHistory.push(nextState);
    currentState = nextState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
