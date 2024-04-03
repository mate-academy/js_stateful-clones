'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

"use strict";

function transformStateWithClones(paramState, actions) {
  const states = [];
  let initialState = { ...paramState };

  for (const index in actions) {
    let newState = { ...initialState };
    const action = actions[index];

    switch (action.type) {
      case "clear":
        newState = {};
        break;
      case "addProperties":
        newState = {
          ...newState,
          ...action.extraData,
        };
        break;
      case "removeProperties":
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      default:
        break;
    }

    states.push(newState);
    initialState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
