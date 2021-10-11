'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const length = actions.length;
  const stateArray = new Array(length);
  const stateClone = Object.assign({}, state);

  //
  for (let i = 0; i < length; i++) {
    switch (actions[i].type) {
      case 'addProperties' :
        for (const items in actions[i].extraData) {
          stateClone[items] = actions[i].extraData[items];
        }
        stateArray[i] = Object.assign({}, stateClone);
        break;
      case 'removeProperties' :
        const length1 = actions[i].keysToRemove.length;

        for (let items = 0; items < length1; items++) {
          if (stateClone.hasOwnProperty(actions[i].keysToRemove[items])) {
            delete stateClone[actions[i].keysToRemove[items]];
          }
        }
        stateArray[i] = Object.assign({}, stateClone);
        break;
      case 'clear' :
        for (const items in stateClone) {
          delete stateClone[items];
        }
        stateArray[i] = Object.assign({}, stateClone);
        break;
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
