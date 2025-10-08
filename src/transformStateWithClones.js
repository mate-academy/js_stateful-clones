'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      default:
        // Nieznany typ akcji – nie zmieniamy stanu
        break;
    }

    // pushujemy sklonowany stan do tablicy
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;


