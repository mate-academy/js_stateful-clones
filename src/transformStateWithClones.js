"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let statesAfterAction = [];
  let copyState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case "addProperties":
        Object.assign(copyState, action.extraData);
        break;

      case "removeProperties":
        action.keysToRemove.forEach((key) => delete copyState[key]);
        break;

      case "clear":
        Object.keys(copyState).forEach((key) => delete copyState[key]);
        break;

    }

    let doubleCopyState = { ...copyState };
    statesAfterAction.push(doubleCopyState);
  });

  return statesAfterAction;
}

module.exports = transformStateWithClones;
