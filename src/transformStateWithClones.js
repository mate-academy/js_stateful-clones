'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const history = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(state, obj.extraData);
        break;

      case 'removeProperties':
        for (const item of obj.keysToRemove) {
          delete state[item];
        }
        break;

      case 'clear':
        for (const item in state) {
          delete state[item];
        }
        break;

      default:
        return null;
    }
    history.push({ ...newState });
  }

  return history;
}

module.exports = transformStateWithClones;
