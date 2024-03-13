'use strict';

function transformStateWithClones(state, actions) {
  const newActions = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    newActions.push({ ...copyState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
