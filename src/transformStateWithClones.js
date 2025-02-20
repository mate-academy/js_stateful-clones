'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Kopia początkowego state
  const history = []; // Tablica przechowująca historię stanów

  actions.forEach((action) => {
    if (action.type === 'clear') {
      currentState = {}; // Tworzymy pusty obiekt
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState }; // Tworzymy kopię przed usunięciem
      action.keysToRemove.forEach((key) => delete currentState[key]);
    }
    history.push({ ...currentState }); // Zapisujemy aktualny stan
  });

  return history;
}

module.exports = transformStateWithClones;
