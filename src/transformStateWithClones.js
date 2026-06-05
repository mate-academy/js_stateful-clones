'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      case 'clear':
        currentState = {};
        break;
    }

    result.push({ ...currentState });
  });

  return result;
}

module.exports = transformStateWithClones;
