"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case "addProperties":
        Object.assign(copy, action.extraData);
        break;

      case "removeProperties":
        action.keysToRemove.forEach((key) => delete copy[key]);
        break;

      case "clear":
        copy = {};
        break;

      default:
        throw new Error(
          action.type
            ? `${action.type} is not supported`
            : `Action is ${action.type}`
        );
    }
    stateHistory.push({ ...copy });
  }
  return stateHistory;
}

module.exports = transformStateWithClones;
