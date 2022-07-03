'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const returnArr = [];
  const statePrepared = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          statePrepared[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          statePrepared[key] = undefined;
        }
        break;
      case 'clear':
        for (const key in statePrepared) {
          statePrepared[key] = undefined;
        }
        break;
    }
    returnArr.push(Object.assign({}, statePrepared));
  }

  return returnArr;
}

module.exports = transformStateWithClones;
