'use strict';

function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        if (action.keysToRemove && action.keysToRemove.length > 0) {
          action.keysToRemove.forEach((key) => {
            delete currentState[key];
          });
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }

    results.push(currentState);
  });

  return results;
}

module.exports = transformStateWithClones;
