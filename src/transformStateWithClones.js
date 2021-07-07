'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const operationsList = [];
  let changedState = { ...state };

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        changedState = Object.assign(changedState, transforms[i].properties);
        break;
      case 'clear':
        changedState = {};
        break;
      case 'removeProperties':
        for (const key in transforms[i].properties) {
          delete changedState[transforms[i].properties[key]];
        }
        break;
    }
    operationsList.push({ ...changedState });
  }

  return operationsList;
}

module.exports = transformStateWithClones;
