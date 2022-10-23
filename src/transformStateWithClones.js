'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = { ...state };
  const arr = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      copyState = {
        ...copyState,
        ...obj.extraData,
      };

      arr.push({
        ...copyState,
        ...obj.extraData,
      });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete copyState[key];
      }
      arr.push({ ...copyState });
    }

    if (obj.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      arr.push({ ...copyState });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
