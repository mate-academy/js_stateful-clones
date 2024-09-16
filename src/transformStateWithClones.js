'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        newState = Object.assign({}, newState, extraData);

        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        newState = {};
        break;
    }
    modifiedState.push(newState);
    currentState = newState;
  }

  return modifiedState;
}

module.exports = transformStateWithClones;
