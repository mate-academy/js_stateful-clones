"use strict";

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = [];
  const copyState = Object.assign({}, state);
  for (const obj of actions) {
    switch (obj.type) {
      case "addProperties":
        for (const key in obj.extraData) {
          copyState[key] = obj.extraData[key];
        }
        result.push(Object.assign({}, copyState));
        break;

      case "removeProperties":
        for (const remove of obj.keysToRemove) {
          delete copyState[remove];
        }
        result.push(Object.assign({}, copyState));
        break;

      default:
        for (const del in copyState) {
          delete copyState[del];
        }
        result.push(Object.assign({}, copyState));
    }
  }
  return result;
}

module.exports = transformStateWithClones;
