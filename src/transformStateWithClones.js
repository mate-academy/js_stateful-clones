'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = {
    ...state,
  };
  const mainArray = [];

  for (const elementArrActions of actions) {
    switch (elementArrActions.type) {
      case 'addProperties' :
        Object.assign(copyState, elementArrActions.extraData);
        break;

      case 'removeProperties' :
        for (const keyForRemove of elementArrActions.keysToRemove) {
          delete copyState[keyForRemove];
        }
        break;

      case 'clear' :
        const keysState = Object.keys(copyState);

        for (const keyForState of keysState) {
          delete copyState[keyForState];
        }
        break;

      default :
        break;
    }
    mainArray.push({ ...copyState });
  }

  return mainArray;
}

module.exports = transformStateWithClones;
