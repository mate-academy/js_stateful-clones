/* eslint-disable */
"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case "addProperties":
        Object.assign(newState, extraData);
        break;
      case "removeProperties":
        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;
      case "clear":
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        return "Invalid action type";
    }

    tempState.push({ ...newState });
  }
  return tempState;
}

module.exports = transformStateWithClones;
