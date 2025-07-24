'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(initialState, actions) {
  const history = [];
  let currentState = { ...initialState }; // Копія початкового стану

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    history.push({ ...currentState }); // Додаємо клон у історію
  }

  return history;
}

module.exports = transformStateWithClones;
