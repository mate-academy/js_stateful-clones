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

  for (const ch of actions) {
    if (ch.type === 'addProperties') {
      Object.assign(stateList, ch.extraData);
      arr.push({ ...stateList });
    }

    if (ch.type === 'removeProperties') {
      for (const remove of ch.keysToRemove) {
        delete stateList[remove];
      }
      arr.push({ ...stateList });
    }

    if (ch.type === 'clear') {
      for (const del in stateList) {
        delete stateList[del];
      }

      arr.push({ ...stateList });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
