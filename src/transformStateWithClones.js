'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete copyState[property];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }

    newState.push({ ...copyState });
  }

  return newState;
}

module.exports = transformStateWithClones;
