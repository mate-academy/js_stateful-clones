'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentStateCopy = { ...state }; // Змінили назву

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentStateCopy = {};
        break;
      case 'addProperties':
        currentStateCopy = { ...currentStateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        currentStateCopy = { ...currentStateCopy };

        for (const key of action.keysToRemove) {
          delete currentStateCopy[key];
        }
        break;
    }

    stateHistory.push({ ...currentStateCopy }); // Зберігаємо копію
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
