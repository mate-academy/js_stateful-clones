"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [state];

  for (let i = 0; i < actions.length; i++) {
    const previousStateCopy = { ...states[i] };

    switch (actions[i].type) {
      case "addProperties":
        Object.assign(previousStateCopy, actions[i].extraData);
        break;

      case "removeProperties":
        for (const key of actions[i].keysToRemove) {
          delete previousStateCopy[key];
        }
        break;

      case "clear":
        for (const key in states[i]) {
          delete previousStateCopy[key];
        }
        break;

      default: {
        throw new Error("Unexpected action type");
      }
    }
    states.push(previousStateCopy);
  }

  states.shift();

  return states;
}

module.exports = transformStateWithClones;
