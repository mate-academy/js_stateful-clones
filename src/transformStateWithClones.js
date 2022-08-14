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

    if (action.type === 'addProperties') {
      resultArr.push(Object.assign(stateAfterAction, action.extraData));
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateAfterAction[key];
      }
      resultArr.push(stateAfterAction);
    } else if (action.type === 'clear') {
      stateAfterAction = {};
      resultArr.push(stateAfterAction);
    }

    localState = stateAfterAction;
  }

  return resultArr;
}

module.exports = transformStateWithClones;
