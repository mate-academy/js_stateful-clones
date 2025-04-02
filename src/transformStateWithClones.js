'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Клонируем исходный объект
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        if (keysToRemove) {
          for (let j = 0; j < keysToRemove.length; j++) {
            delete currentState[keysToRemove[j]];
          }
        }
        break;
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
