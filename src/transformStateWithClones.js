'use strict';

function transformStateWithClones(state, actions) {
  const newActions = [];
  let nextState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(nextState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete nextState[actions[i].keysToRemove[j]];
        }
        break;

      default:
        nextState = {};
    }

    newActions.push({ ...nextState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
