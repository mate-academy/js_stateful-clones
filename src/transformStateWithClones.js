'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  const currentState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }

        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error('Not supported this action type');
    }

    transformedStates.push(Object.assign({}, currentState));
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
