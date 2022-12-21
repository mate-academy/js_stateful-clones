'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const clones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete newState[value];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }
    clones.push({ ...newState });
  }

  return clones;
}

module.exports = transformStateWithClones;
