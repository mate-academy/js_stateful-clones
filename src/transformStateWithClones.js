'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(originState, actions) {
  const arrState = [];
  let state = { ...originState };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(state, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete state[key];
        }
        break;

      case 'clear':
        state = {};

        break;

      default:
        continue;
    }

    arrState.push({ ...state });
  }

  return arrState;
}

module.exports = transformStateWithClones;
