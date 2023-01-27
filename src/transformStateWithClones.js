'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const item in actions[i].extraData) {
        copy[item] = actions[i].extraData[item];
      }
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete copy[actions[i].keysToRemove[j]];
      }
    } else {
      copy = {};
    }

    resultArray.push({
      ...copy,
    });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
