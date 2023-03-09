"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const mas = [];

  for (const action of actions) {
    switch (action.type) {
      case "addProperties":
        for (const key in action.extraData) {
          copyState[key] = action.extraData[key];
        }

        mas.push({ ...copyState });
        break;

      case "removeProperties":
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        mas.push({ ...copyState });
        break;

      case "clear":
        for (const key in copyState) {
          delete copyState[key];
        }

        mas.push({});
        break;
    }
  }

  return mas;
}

module.exports = transformStateWithClones;
