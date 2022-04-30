'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let countKeyState;
  const copyState = {
    ...state,
  };
  const mainArray = [];
  let clearObject = {};

  for (countKeyState = 0; countKeyState < actions.length; countKeyState++) {
    if (actions[countKeyState].type === 'addProperties') {
      Object.assign(copyState, actions[countKeyState].extraData);
    } else if (actions[countKeyState].type === 'removeProperties') {
      for (const keyForRemove of actions[countKeyState].keysToRemove) {
        delete copyState[keyForRemove];
      }
    } else if (actions[countKeyState].type === 'clear') {
      const keysState = Object.keys(copyState);

      for (const keyForState of keysState) {
        delete copyState[keyForState];
      }
    }

    clearObject = {
      ...copyState,
    };
    mainArray.push(clearObject);
    clearObject = {};
  }

  return mainArray;
}

module.exports = transformStateWithClones;
