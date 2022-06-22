'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let curState = { ...state };
  const statesArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      curState = {
        ...curState,
        ...extraData,
      };
    }

    if (type === 'clear') {
      curState = {};
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        if (key in curState) {
          delete curState[key];
        }
      }
    }
    statesArr.push({ ...curState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
