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

const testState = {
  foo: "bar",
  bar: "foo",
};

transformStateWithClones(testState, [
  {
    type: "addProperties",
    extraData: {
      name: "Jim",
      hello: "world",
    },
  },
  {
    type: "removeProperties",
    keysToRemove: ["bar", "hello"],
  },
  {
    type: "addProperties",
    extraData: { another: "one" },
  },
]);

module.exports = transformStateWithClones;

/* "use strict";

function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let previousState = { ...state };

  for (const action of actions) {
    let currentState = { ...previousState };

    switch (action.type) {
      case "addProperties":
        Object.assign(currentState, action.extraData);
        break;
      case "removeProperties":
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      case "clear":
        currentState = {};
        break;
      default:
        throw new Error("Tipo de ação inválido: " + action.type);
    }
    result.push(currentState);
    previousState = currentState;
  }
}

module.exports = transformStateWithClones; */
