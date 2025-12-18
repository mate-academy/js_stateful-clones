/**
 * @param {object} state
 * @param {object[]} actions
 *
 * @returns {object[]}
 */
const transformStateWithClones = (state, actions) => {
  const history = [];
  let historyIndex = 0;
  let currentState = {};

  for (const key in state) {
    currentState[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const nextState = {};

    if (action.type === 'clear') {
      // Objeto vazio
    } else if (action.type === 'addProperties') {
      for (const key in currentState) {
        nextState[key] = currentState[key];
      }

      for (const key in action.extraData) {
        nextState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key in currentState) {
        let shouldRemove = false;

        for (let j = 0; j < action.keysToRemove.length; j++) {
          if (action.keysToRemove[j] === key) {
            shouldRemove = true;
            break;
          }
        }

        if (!shouldRemove) {
          nextState[key] = currentState[key];
        }
      }
    }

    currentState = nextState;
    history[historyIndex] = nextState;
    historyIndex++;
  }

  return history;
};

module.exports = transformStateWithClones;
