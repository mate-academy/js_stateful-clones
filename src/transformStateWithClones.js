'use strict';

function transformStateWithClones(state, actions) {
  const result = [];

  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        newState = {};
        break;

      default:
        return null;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
