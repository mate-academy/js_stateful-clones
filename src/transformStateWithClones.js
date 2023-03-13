'use strict';

function transformStateWithClones(state, actions) {
  const result = [];

  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        result.push(newState);
        break;

      case 'removeProperties':
        const updatedState = { ...newState };

        for (const key of keysToRemove) {
          delete updatedState[key];
        }

        newState = updatedState;
        result.push(newState);
        break;

      case 'clear':
        newState = {};
        result.push(newState);
        break;

      default:
        return null;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
