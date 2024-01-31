'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let resultObj = Object.assign({}, state);
  let action = [];
  let masiveWithAction = [];

  for (const i of actions) {
    action = i;
    masiveWithAction = [];

    for (const ggt in action) {
      masiveWithAction.push(action[ggt]);
    }

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        resultObj[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      masiveWithAction[1].forEach(key => delete resultObj[key]);
    }

    if (action.type === 'clear') {
      resultObj = {};
    }

    result.push(Object.assign({}, resultObj));
  }

  return result;
}

module.exports = transformStateWithClones;
