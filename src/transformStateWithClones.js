'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(clone, actions[i].extraData);
        history.push({ ...clone });
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete clone[key];
        }
        history.push({ ...clone });
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        history.push({ ...clone });
        break;

      default:
        throw new Error('Error');
    }
  }

  return history;
}

module.exports = transformStateWithClones;
