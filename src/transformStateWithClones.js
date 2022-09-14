'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateObj = { ...state };
  const actionsArr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateObj, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateObj[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateObj) {
        delete stateObj[key];
      }
    }

    actionsArr.push({ ...stateObj });
  }

  return actionsArr;
}

module.exports = transformStateWithClones;
