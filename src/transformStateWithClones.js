'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const modifiedArr = [];
  const finalSolution = [];
  const modifiedState = { ...state };

  modifiedArr.push(modifiedState);

  let lastElement = modifiedArr[modifiedArr.length - 1];

  for (const prop of actions) {
    switch (prop.type) {
      case 'clear': {
        lastElement = {};
        break;
      }

      case 'addProperties': {
        for (const key in prop.extraData) {
          lastElement[key] = prop.extraData[key];
        }
        break;
      }

      case 'removeProperties': {
        for (const key of prop.keysToRemove) {
          delete lastElement[key];
        }
        break;
      }

      default: {
        return 'Please enter valid data';
      }
    }

    const roundLog = { ...lastElement };

    finalSolution.push(roundLog);
  }

  return finalSolution;
}

module.exports = transformStateWithClones;
