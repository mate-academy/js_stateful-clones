"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStateVersions = [];
  const currentState = {
    ...state,
  };

  actions.forEach((element) => {
    const action = element.type;

    switch (action) {
      case "addProperties":
        const { extraData } = element;

        for (const key in extraData) {
          currentState[key] = extraData[key];
        }
        allStateVersions.push(Object.assign({}, currentState));
        break;

      case "removeProperties":
        const { keysToRemove } = element;

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        allStateVersions.push(Object.assign({}, currentState));
        break;

      case "clear":
        for (const key in currentState) {
          delete currentState[key];
        }
        allStateVersions.push(Object.assign({}, currentState));
        break;
    }
  });

  return allStateVersions;
}

module.exports = transformStateWithClones;
