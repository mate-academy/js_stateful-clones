'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let currState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        currState = {
          ...currState, ...extraData,
        };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (currState.hasOwnProperty(key)) {
            delete currState[key];
          }
        }
        break;

      case 'clear':
        currState = {};
        break;
    }
    resultArr.push({ ...currState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
