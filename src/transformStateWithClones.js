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
  const arrayStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        copyState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
    }

    arrayStates.push(copyState);
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
