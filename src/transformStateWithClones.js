'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const statesArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(tempState, extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete tempState[key];
        }
        break;
      }

      case `clear`: {
        for (const key in tempState) {
          delete tempState[key];
        }
        break;
      }

      default: {
        break;
      }
    }
    statesArr.push({ ...tempState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
