'use strict';

function transformStateWithClones(state, actions) {
  const newStatesArr = [];
  const newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const prop of keysToRemove) {
          if (newState[prop]) {
            delete newState[prop];
          }
        }
        break;

      case 'clear':
        for (const prop of Object.getOwnPropertyNames(newState)) {
          delete newState[prop];
        }
        break;

      default:
        throw new Error('Unexpected action');
    }

    newStatesArr.push({ ...newState });
  }

  return newStatesArr;
}

module.exports = transformStateWithClones;
