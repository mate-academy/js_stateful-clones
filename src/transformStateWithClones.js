'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copyState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const value of action.keysToRemove) {
          delete copyState[value];
        }
        break;
      }

      case 'clear': {
        copyState = {};
        break;
      }

      default: {
        break;
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
