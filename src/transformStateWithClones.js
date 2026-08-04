'use strict';

function transformStateWithClones(state, actions) {
  let stateClone = { ...state };

  const RESULT_OUTPUT = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'removeProperties':
        for (const KEY in stateClone) {
          for (const DATA_KEY of ACTION.keysToRemove) {
            if (DATA_KEY === KEY) {
              delete stateClone[KEY];
            }
          }
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      case 'addProperties':
        stateClone = { ...stateClone, ...ACTION.extraData };
        break;

      default:
        throw new Error('Delete your PC or give me a normal action type');
    }
    RESULT_OUTPUT.push({ ...stateClone });
  }

  return RESULT_OUTPUT;
}

module.exports = transformStateWithClones;
