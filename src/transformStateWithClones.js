'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  const stateAction = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          stateAction[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateAction[key];
        }
        break;
      case 'clear':
        for (const key in stateAction) {
          delete stateAction[key];
        }
        break;
    }
    result.push({ ...stateAction });
  }

  return result;
}

module.exports = transformStateWithClones;
