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
    const { type } = action;

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        result.push({ ...currentState });
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove || [];

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        result.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};
        result.push({ ...currentState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
