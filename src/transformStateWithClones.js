'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Tablica, która będzie przechowywać historię stanów
  const stateHistory = [];

  // Zaczynamy od klonowania początkowego stanu
  let currentState = { ...state };

  // Iterujemy po każdej akcji
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Tworzymy nowy pusty obiekt stanu
        currentState = {};
        break;

      case 'addProperties':
        // Dodajemy nowe właściwości do sklonowanego stanu
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Klonujemy stan i usuwamy wskazane klucze
        currentState = { ...currentState };
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Dodajemy sklonowany i zmodyfikowany stan do historii
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
