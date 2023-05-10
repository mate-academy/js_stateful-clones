'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let joinedState = { ...state };

  for (const change of actions) {
    switch (change.type) {
      case 'addProperties':
        Object.assign(joinedState, change.extraData);
        break;

      case 'removeProperties':
        for (const key of change.keysToRemove) {
          delete joinedState[key];
        }
        break;

      case 'clear':
        joinedState = {};
        break;
    }
    result.push({ ...joinedState });
  }

  return result;
}

module.exports = transformStateWithClones;
