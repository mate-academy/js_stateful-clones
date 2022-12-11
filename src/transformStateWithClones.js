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

    switch (type) {
      case 'addProperties':
        curState = {
          ...curState,
          ...extraData,
        };
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in curState) {
            delete curState[key];
          }
        }
        break;
      case 'clear':
        curState = {};
        break;
      default:
        return null;
    }

    statesArr.push({ ...curState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
