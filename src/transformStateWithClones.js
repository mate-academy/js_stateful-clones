'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let localState = { ...state };

  for (const action of actions) {
    let stateAfterAction = { ...localState };

    switch (action.type) {
      case 'addProperties':
        resultArr.push(Object.assign(stateAfterAction, action.extraData));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateAfterAction[key];
        }
        resultArr.push(stateAfterAction);
        break;
      case 'clear':
        stateAfterAction = {};
        resultArr.push(stateAfterAction);
    }

    localState = stateAfterAction;
  }

  return resultArr;
}

module.exports = transformStateWithClones;
