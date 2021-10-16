'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let tempObj = {};
  let stateObj = {};

  tempObj = Object.assign(tempObj, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        tempObj[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete tempObj[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in tempObj) {
        delete tempObj[key];
      }
    }
    stateObj = { ...tempObj };
    resultArray.push(stateObj);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
