'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateList = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateList, action.extraData);
      arr.push({ ...stateList });
    }

    if (action.type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete stateList[remove];
      }
      arr.push({ ...stateList });
    }

    if (action.type === 'clear') {
      for (const del in stateList) {
        delete stateList[del];
      }

      arr.push({ ...stateList });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
