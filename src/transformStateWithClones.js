'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        result.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }

        result.push({ ...copyState });
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        result.push({ ...copyState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
