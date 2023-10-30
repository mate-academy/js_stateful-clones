'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_COPY = {
    ...state,
  };

  const result = [STATE_COPY];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const currentStep = {
      ...result[result.length - 1],
    };

    switch (type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          currentStep[key] = value;
        }
        result.push(currentStep);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentStep[key];
        }
        result.push(currentStep);
        break;
      case 'clear':
        result.push({});
        break;
      default:
        throw new Error('Unknown action type');
    }
  }
  result.shift();

  return result;
}

module.exports = transformStateWithClones;
