'use strict';

function transformStateWithClones(state, actions) {
  let suporte = {};
  let suporte2 = {};

  for (let i = 0; i < actions.length; i++) {
    suporte = {};
    suporte2 = {};

    if (actions[i].type === 'addProperties') {
      suporte2 = { ...actions[i].extraData };
      suporte = Object.assign(suporte2, state);
      Object.assign(state, suporte);
    } else if (actions[i].type === 'clear') {
      const key = Object.keys(state);

      for (let j = 0; j < key.length; j++) {
        delete state[key[j]];
      }
    } else if (actions[i].type === 'removeProperties') {
      const propriedadesParaRemover = Object.values(actions[i].keysToRemove);

      for (let j = 0; j < propriedadesParaRemover.length; j++) {
        delete state[propriedadesParaRemover[j]];
      }
    }
  }
}

module.exports = transformStateWithClones;

/*
Escreva uma função transformStateWithClones que receba um objeto de estado e um array de ações, aplique cada ação ao estado anterior para calcular o próximo estado e retorne um array com os estados recebidos após cada ação.

Cada ação é um objeto que descreve mudanças de estado. Dependendo do valor de sua propriedade de tipo, você deve fazer o seguinte:

clear - cria um objeto de estado vazio;
addProperties - adiciona todos os pares chave:valor fornecidos na propriedade extraData ao novo estado;
removeProperties - remove todas as chaves fornecidas no array keysToRemove do estado. (ignora as não existentes)
IMPORTANTE! NÃO modifique o objeto de estado inicial de forma alguma!



*/