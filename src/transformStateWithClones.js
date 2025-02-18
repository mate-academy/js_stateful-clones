'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedStates = [];
  let currentState = { ...state };

  // на каждой итерации мы не мутируем обьект а создаем новую копию обьекта
  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        const newState = {};

        for (const key in currentState) {
          if (!keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }
        }

        currentState = newState;
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    transformedStates.push({ ...currentState });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
