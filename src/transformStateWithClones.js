'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const file of action.keysToRemove) {
          delete copyState[file];
        }
        break;

      case 'clear':
        for (const value in copyState) {
          delete copyState[value];
        }
        break;

      default: Error('No matches found');
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
