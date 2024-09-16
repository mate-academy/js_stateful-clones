'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionArray = [];
  let clonedState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        clonedState = {
          ...clonedState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (clonedState.hasOwnProperty(key)) {
            delete clonedState[key];
          }
        }
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        break;
    }

    actionArray.push({ ...clonedState });
  }

  return actionArray;
}

module.exports = transformStateWithClones;
