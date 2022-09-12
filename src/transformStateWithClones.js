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
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(copyState, action.extraData);
        result.push({ ...copyState });
        break;

      case action.type === 'removeProperties':
        action.keysToRemove.forEach(e => delete copyState[e]);
        result.push({ ...copyState });
        break;

      case action.type === 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        result.push({ ...copyState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
