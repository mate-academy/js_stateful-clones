'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  // Копіюю вхідний об'єкт.
  const newState = { ...state };

  for (const action of actions) {
    // Виконую функцію `transform`.
    transform(newState, action);

    // Додаю модифікований об'єкт у створений вище масив.
    result.push({ ...newState });
  }

  return result;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties': {
      // Додаю вказані значення до існуючого об'єкту.
      Object.assign(state, action.extraData);

      break;
    }

    case 'removeProperties': {
      // Видаляю вказані ключі з об'єкту.
      for (const item of action.keysToRemove) {
        if (state.hasOwnProperty(item)) {
          delete state[item];
        }
      }

      break;
    }

    case 'clear': {
      // Cтворюю пустий об'єкт.
      for (const key of Object.keys(state)) {
        delete state[key];
      }

      break;
    }

    default: {
      return state;
    }
  }
}

module.exports = transformStateWithClones;
