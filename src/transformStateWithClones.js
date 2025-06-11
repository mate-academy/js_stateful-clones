'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state }; // Cria uma cópia do estado inicial
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
      // console.log(`Ação desconhecida: ${action.type}`);
    }
    history.push({ ...stateCopy }); // Adiciona uma cópia do estado ao histórico
  });

  return history;
}

module.exports = transformStateWithClones;
