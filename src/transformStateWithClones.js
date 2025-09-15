'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties': {
        const extra =
          action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};
        currentState = { ...currentState, ...extra };
        break;
      }

      case 'removeProperties': {
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];
        currentState = { ...currentState };
        for (const key of keys) {
          delete currentState[key];
        }
        break;
      }

      default:
        throw new Error(`Неизвестный тип действия: ${action.type}`);
    }

    history.push({ ...currentState }); // Гарантированно новый клон
  }

  return history;
}

module.exports = transformStateWithClones;


module.exports = transformStateWithClones;
