'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };

  return actions.map(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties': {
        newState = {
          ...newState,
          ...extraData,
        };
        break;
      }

      case 'removeProperties': {
        const copiedState = { ...newState };

        keysToRemove.forEach((key) => {
          delete copiedState[key];
        });
        newState = copiedState;
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }
      default:
        return newState;
    }

    return newState;
  });
}

module.exports = transformStateWithClones;
