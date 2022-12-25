'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const resArr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      resArr.push({ ...stateClone });
    }

    if (action.type === 'removeProperties') {
      for (const item of action.keysToRemove) {
        delete stateClone[item];
      }
      resArr.push({ ...stateClone });
    }

    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
      resArr.push({ ...stateClone });
    }
  }

  return resArr;
}

module.exports = transformStateWithClones;
