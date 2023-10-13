'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    const newState = { ...currentState };

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          newState[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
        break;
    }

    result.push({ ...newState });

  }

  return result;
}
