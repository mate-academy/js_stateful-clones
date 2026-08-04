'use strict';

function transformStateWithClones(state, actions) {
  let stateClone = { ...state };

  const resultOutput = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'removeProperties':
        for (const KEY of ACTION.keysToRemove) {
          const { [KEY]: _, ...rest } = stateClone;

          stateClone = rest;
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
    resultOutput.push({ ...stateClone });
  }

  return resultOutput;
}

module.exports = transformStateWithClones;
