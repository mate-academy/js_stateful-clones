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

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        newState[key] = actions[i].extraData[key];
      }
      resultArray.push(Object.assign({}, newState));
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        if (newState[actions[i].keysToRemove[j]]) {
          delete newState[actions[i].keysToRemove[j]];
        }
      }
      resultArray.push(Object.assign({}, newState));
    }

    if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      resultArray.push(Object.assign({}, newState));
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
