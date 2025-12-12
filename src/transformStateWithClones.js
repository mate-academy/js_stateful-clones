function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // clone inicial para não alterar o original
  const history = [];

  for (const action of actions) {
    // sempre começar com um clone do estado atual
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {}; // zera tudo
        break;

      case 'addProperties':
        // merge mantendo imutabilidade
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        // remove cada chave solicitada (se existir)
        for (const key of action.keysToRemove || []) {
          delete newState[key];
        }
        break;

      default:
        // Ação desconhecida: mantemos o estado atual (mas salvamos um clone)
        // Isso satisfaz o requisito do case default sem alterar state original.
        newState = { ...currentState };
        break;
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
