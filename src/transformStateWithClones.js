'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = []; // array para guardar os resultados
  let currentState = { ...state };
  // cópia do estado atual, pois não podemos alterar o original
  // ...state (spread operator , ele cria um novo objeto copiando as
  // propriedades do state e armazenando em current, assim o objeto
  // state original não é alterado)

  for (const action of actions) {
    // loop para percorrer cada tipo de ação
    switch (action.type) {
      case 'clear':
        // 'clear'- criar um objeto com state vazio.
        currentState = {};
        break;

      case 'addProperties':
        // 'addProprieties' :adicionar todos os
        // pares `key:value`
        // fornecidos em 'extraData' no novo state
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        // para nao alterar o state atual criamos um novo
        // e copiamos o currentState
        const newState = { ...currentState };

        // remove cada chave listada em keysToRemove
        for (const key of action.keysToRemove) {
          delete newState[key]; //
        }
        currentState = newState;
        break;

      default:
        // se vier uma ação desconhecida, simplesmente não faz nada
        break;
    }
    // aqui vai adicionar no array criado para receber as mudanças
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
