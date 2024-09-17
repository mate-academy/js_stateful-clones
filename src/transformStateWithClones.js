"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case "addProperties":
        Object.assign(copyState, action.extraData);

        break;

      case "removeProperties":
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }

        break;

      case "clear":
        for (const key in copyState) {
          delete copyState[key];
        }

        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
