'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(clonedState, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }

        break;
      }

      case 'clear': {
        clonedState = {};
        break;
      }

      default: {
        throw Error(`Unknown action: ${action.type}`);
      }
    }

    const clonedStateCopy = { ...clonedState };

    result.push(clonedStateCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
