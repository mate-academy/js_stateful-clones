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
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          tempObj[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete tempObj[key];
        }
        break;

      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }
        break;
    }
    stateObj = { ...tempObj };
    resultArray.push(stateObj);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
