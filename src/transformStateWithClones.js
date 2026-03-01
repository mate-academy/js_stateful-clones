'use strict';

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  actions.forEach((action) => {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;

      default:
        nextState = { ...currentState };
    }

    history.push(nextState);
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;