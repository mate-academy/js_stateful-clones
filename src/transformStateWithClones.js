'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          stateCopy[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        Object.keys(stateCopy).forEach((key) => {
          delete stateCopy[key];
        });
        break;

      default:
        stateCopy['error'] = 'error';
    }
    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
