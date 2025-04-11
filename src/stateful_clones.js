function transformStateWithClones(state, actions) {
    let currentState = { ...state }; // początkowa kopia stanu
    const history = [];
  
    for (const action of actions) {
      switch (action.type) {
        case 'clear':
          currentState = {};
          break;
  
        case 'addProperties':
          currentState = { ...currentState, ...action.extraData };
          break;
  
        case 'removeProperties':
          currentState = { ...currentState };
          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
          break;
  
        default:
          // Jeśli pojawi się nieznany typ akcji, można go zignorować lub rzucić wyjątek.
          // Tu ignorujemy.
          break;
      }
  
      // Dodajemy kopię stanu do historii (żeby nie wskazywała na ten sam obiekt)
      history.push({ ...currentState });
    }
  
    return history;
  }
  