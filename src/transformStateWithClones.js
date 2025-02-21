'use strict';

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = Object.keys(currentState)
          .filter((key) => !action.keysToRemove.includes(key))
          .reduce((newState, key) => {
            newState[key] = currentState[key];

            return newState;
          }, {});
        break;
    }
    history.push({ ...currentState });
  });

  return history;
}

module.exports = transformStateWithClones;
