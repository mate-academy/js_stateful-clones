'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        result.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
