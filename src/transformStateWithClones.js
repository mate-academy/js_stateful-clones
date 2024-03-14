'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const newState = [];

  for (const data of actions) {
      switch (data.type) {
          case "addProperties":
              Object.assign(stateCopy, data.extraData)
          break;
          case "clear":
               for (const item in stateCopy) {
                   delete stateCopy[item];
               }
            break;
          case "removeProperties":
          for (const key of data.keysToRemove) {
              delete stateCopy[key];
          }
          break;
          default:
              throw Error("Error");
      }
      newState.push({...stateCopy});
  }

    return newState;

}

module.exports = transformStateWithClones;
