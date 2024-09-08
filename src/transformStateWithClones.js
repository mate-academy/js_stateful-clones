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
  let stateCopy = { ...state };

  // Iterujemy po każdej akcji
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Tworzymy nowy pusty obiekt stanu
        stateCopy = {};
        break;

      case 'addProperties':
        // Dodajemy nowe właściwości do sklonowanego stanu
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        // Usuwamy wskazane klucze z bieżącego stanu
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Dodajemy sklonowany i zmodyfikowany stan do historii
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
