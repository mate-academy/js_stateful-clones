'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case "addProperties":
        const { extraData } = action;

        for (const item in extraData) {
          copyOfState[item] = extraData[item];
        }
        break;

      case "removeProperties":
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (key in copyOfState) {
            delete copyOfState[key];
          }
        }
        break;

      case "clear":
        for (const elem of Object.keys(copyOfState)) {
          delete copyOfState[elem];
        }
        break;

      default:
        break;
    }
    resultArray.push({ ...copyOfState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
