"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case "addProperties":
        Object.keys(action.extraData).forEach((key) => {
          newState[key] = action.extraData[key];
        });
        break;

      case "removeProperties":
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case "clear":
        Object.keys(newState).forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        throw new Error("Unknwon action!");
    }

    stateVersions.push({ ...newState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
