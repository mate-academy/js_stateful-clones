"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let objectFromState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (arr.length >= 1) {
      objectFromState = Object.assign({}, arr[i - 1]);
    }

    if (actions[i].type === "addProperties") {
      Object.assign(objectFromState, actions[i].extraData);
    }

    if (actions[i].type === "removeProperties") {
      const propToDelete = actions[i].keysToRemove;

      for (let j = 0; j < propToDelete.length; j++) {
        delete objectFromState[propToDelete[j]];
      }
    }

    if (actions[i].type === "clear") {
      for (const prop in objectFromState) {
        if (objectFromState.hasOwnProperty(prop)) {
          delete objectFromState[prop];
        }
      }
    }

    arr.push(objectFromState);
  }

  return arr;
}

module.exports = transformStateWithClones;
