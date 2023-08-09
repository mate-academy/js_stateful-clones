'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let extraState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        extraState = {
          ...extraState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        extraState = { ...extraState };

        for (const keysToRemove of action.keysToRemove) {
          delete extraState[keysToRemove];
        }
        break;

      case 'clear':
        extraState = {};
        break;
    }

    newState.push(extraState);
  }

  return newState;
}

module.exports = transformStateWithClones;
