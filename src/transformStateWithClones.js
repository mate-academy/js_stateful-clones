'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArray = [];
  const newState = Object.assign({}, state);

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties' : {
        Object.assign(newState, actions[i].extraData);
        break;
      }

      case 'removeProperties' : {
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          if (newState[actions[i].keysToRemove[j]]) {
            delete newState[actions[i].keysToRemove[j]];
          }
        }
        break;
      }

      default : {
        for (const key in newState) {
          delete newState[key];
        }
      }
    }
    resultArray.push(Object.assign({}, newState));
  }

  return resultArray;
}

module.exports = transformStateWithClones;
