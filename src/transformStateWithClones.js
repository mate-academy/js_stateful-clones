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
  let actionWithWork = [];
  let keysesToRem = null;
  let keysesToAdd = null;

  for (let i = 0; i < actions.length; i++) {
    action = actions[i];
    actionWithWork = [];

    for (const ggt in action) {
      actionWithWork.push(action[ggt]);
    }

    if (actionWithWork[0] === 'addProperties') {
      keysesToAdd = actionWithWork[1];

      for (const key in keysesToAdd) {
        resultObj[key] = keysesToAdd[key];
      }
    }

    if (actionWithWork[0] === 'removeProperties') {
      keysesToRem = actionWithWork[1];
      keysesToRem.forEach(key => delete resultObj[key]);
    }

    if (actionWithWork[0] === 'clear') {
      resultObj = {};
    }

    result.push(Object.assign({}, resultObj));
  }

  return result;
}

module.exports = transformStateWithClones;

// if (ffir[0] === 'removeProperties') {
//   // for (const j of ffir[1]) {
//   //   removeProp = ffir[1][j];
//   //   delete resultObj[removeProp];
//   // }

//   if (ffir[1].length === 0) {
//     Object.assign(resultObj, state);
//     resultMas.push(resultObj);
//   }
//   resultMas.push({}) need to think;
// }
//
// return result;

// for (let i = 0; i < actions.length; i++) {
//   if (actions[i] === 'addProperties') {
//     result.push(actions[i + 1]);
//   }
// }
