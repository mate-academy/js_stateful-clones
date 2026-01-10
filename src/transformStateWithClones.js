'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
/**
 * @param {Object} state - початковий об'єкт
 * @param {Object[]} actions - масив дій
 *
 * @return {Object[]} - масив станів після кожної дії
 */
function transformStateWithClones(state, actions) {
  const history = [];

  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        break;

      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
