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
        const { extraData } = action;

        newState = { ...newState, ...extraData };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete newState[key];
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
