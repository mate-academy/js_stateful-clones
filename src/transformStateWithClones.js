'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete newState[removeKey];
        }
        break;
      case 'clear':
        newState = {};
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
