'use strict';

function transformStateWithClones(state, actions) {
  let stateClone = { ...state };

  const RESULT_OUTPUT = [];

  for (const ACTION of actions) {
    if (ACTION.type === 'removeProperties') {
      for (const KEY in stateClone) {
        for (const DATA_KEY of ACTION.keysToRemove) {
          if (DATA_KEY === KEY) {
            delete stateClone[KEY];
          }
        }
      }
    }

    if (ACTION.type === 'clear') {
      stateClone = {};
    }

    if (ACTION.type === 'addProperties') {
      stateClone = { ...stateClone, ...ACTION.extraData };
    }

    RESULT_OUTPUT.push({ ...stateClone });
  }

  return RESULT_OUTPUT;
}

module.exports = transformStateWithClones;
