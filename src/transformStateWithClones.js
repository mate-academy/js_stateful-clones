'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const colyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(colyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete colyState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(colyState)) {
          delete colyState[key];
        }
        break;
    }

    result.push({ ...colyState });
  }

  return result;
}

module.exports = transformStateWithClones;
