'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let modState = Object.assign({}, state);
  const resultingArray = [];

  for (const action of actions) {
    for (const key in action) {
      switch (action[key]) {
        case 'clear':
          modState = {};
          break;

        case 'addProperties':
          Object.assign(modState, action.extraData);
          break;

        case 'removeProperties':

          for (const secondLevelKey in action.keysToRemove) {
            delete modState[action.keysToRemove[secondLevelKey]];
          }
          break;
      }
    }
    resultingArray.push({ ...modState });
  }

  return resultingArray;
}

module.exports = transformStateWithClones;
