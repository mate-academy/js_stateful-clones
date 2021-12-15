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
        Object.assign(newState, obj.extraData);
        break;

      case 'removeProperties':
        for (const item of obj.keysToRemove) {
          delete newState[item];
        }
        break;

      case 'clear':
        for (const item in newState) {
          delete newState[item];
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
