'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const doing of actions) {
    if (doing.type === `addProperties`) {
      currentState = { ...currentState, ...doing.extraData };
      // result.push({ ...currentState });
    }

    if (doing.type === `removeProperties`) {
      const newcurrentState = { ...currentState };

      for (const remove of doing.keysToRemove) {
        delete newcurrentState[remove];
      }
      currentState = newcurrentState;
      // result.push({ ...newcurrentState });
    }

    if (doing.type === `clear`) {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
