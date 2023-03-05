/* eslint-disable no-unused-vars */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedStates = [];
  let currentState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;
      case 'removeProperties':
        for (const [key, value] of Object.entries(currentState)) {
          if (keysToRemove.includes(key)) {
            delete currentState[key];
          }
        }

        break;
      case 'clear':
        currentState = {};
        break;
      default:
        return 'Unknown action type';
    }

    clonedStates.push({ ...currentState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
