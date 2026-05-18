'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  const history = [];
  let currentState = state;

  actions.forEach((action) => {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        // [Checklist #3]: Явно обробляємо помилку для невідомих типів дій
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(stateCopy);
    currentState = stateCopy;
  });

  return history;
};

module.exports = transformStateWithClones;
