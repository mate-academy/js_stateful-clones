'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  result.push({ ...state });

  for (const action of actions) {
    const currentState = { ...result[result.length - 1] };

    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;
        const updatedState = {
          ...currentState, ...extraData,
        };

        result.push(updatedState);
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;
        const newState = { ...currentState };

        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        result.push(newState);
        break;

      case 'clear':
        result.push({});
        break;

      default:
        break;
    }
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
