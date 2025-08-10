'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };

        break;

      case 'removeProperties':
        const removeCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete removeCopy[key];
        }
        currentState = removeCopy;

        break;

      case 'clear':
        const clearCopy = {};

        currentState = clearCopy;

        break;

      default:
        // Можна кинути помилку або залишити порожньо
        break;
    }
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
