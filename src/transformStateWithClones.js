const ACTION_TYPE_CLEAR = 'clear';
const ACTION_TYPE_ADD_PROPERTIES = 'addProperties';
const ACTION_TYPE_REMOVE_PROPERTIES = 'removeProperties';

/**
 * Оновлює стан об'єкта на основі масиву дій і повертає історію змін.
 *
 * @param {Object} initialState - Початковий стан об'єкта.
 * @param {Object[]} actions - Масив дій, які будуть застосовані до стану.
 * @returns {Object[]} - Масив станів після кожної дії.
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let currentState = { ...initialState };

  actions.forEach((action) => {
    if (action.type === ACTION_TYPE_CLEAR) {
      currentState = {};
    }

    if (action.type === ACTION_TYPE_ADD_PROPERTIES) {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === ACTION_TYPE_REMOVE_PROPERTIES) {
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    }

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones; // Експортуємо функцію
