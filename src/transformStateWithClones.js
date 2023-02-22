'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const state2 = Object.assign({}, state);

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(state2, action.extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete state2[key];
        }
        break;

      case 'clear':
        for (const key in state2) {
          delete state2[key];
        }
        break;
    }
    result.push({ ...state2 });
  }

  return result;
}

module.exports = transformStateWithClones;
