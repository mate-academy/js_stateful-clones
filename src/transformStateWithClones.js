'use strict';

/**
 * Transforma o estado com base em uma matriz de ações.
 * @param {Object} state - O estado inicial.
 * @param {Object[]} actions - A matriz de ações a serem aplicadas.
 * @return {Object[]} - Uma matriz com os estados resultantes após cada ação.
 */
function transformStateWithClones(state, actions) {
  const stateResult = [];
  let matrizObj = { ...state };

  actions.forEach((element) => {
    switch (element.type) {
      case 'addProperties':
        matrizObj = { ...matrizObj, ...element.extraData };
        break;
      case 'removeProperties':
        matrizObj = { ...matrizObj };

        element.keysToRemove.forEach((key) => {
          delete matrizObj[key];
        });
        break;
      case 'clear':
        matrizObj = {};
        break;
      default:
    }
    stateResult.push({ ...matrizObj });
  });

  return stateResult;
}

module.exports = transformStateWithClones;
