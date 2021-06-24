'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = {
    ...state,
  };
  const transformClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        transformClones.push({ ...newState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        transformClones.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        transformClones.push({ ...newState });
        break;

      default:
    }
  }

  return transformClones;
}

module.exports = transformStateWithClones;
