'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(cloneState, action['extraData']);
        break;

      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete cloneState[key];
        }
        break;

      case `clear`:
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        continue;
    }

    const clone2 = { ...cloneState };

    result.push(clone2);
  }

  return result;
}

module.exports = transformStateWithClones;
