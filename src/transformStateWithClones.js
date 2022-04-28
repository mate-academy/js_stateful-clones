'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        copiedState = {};
        break;
    }

    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
