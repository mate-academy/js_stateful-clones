'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const { type } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
