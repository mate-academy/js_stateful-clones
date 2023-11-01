"use strict";

function applyActionsToState(state, actions) {
  const resultArray = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case "addProperties":
        currentState = { ...currentState, ...extraData };
        break;
      case "removeProperties":
        currentState = Object.keys(currentState).reduce((acc, key) => {
          if (!keysToRemove.includes(key)) {
            acc[key] = currentState[key];
          }
          return acc;
        }, {});
        break;
      case "clear":
        currentState = {};
        break;
      default:
        break;
    }

    resultArray.push({ ...currentState });
  });

  return resultArray;
}

module.exports = applyActionsToState;
