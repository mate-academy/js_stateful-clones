'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const currentStateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentStateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentStateCopy[key];
        }
        break;

      case 'clear':
        for (const key in currentStateCopy) {
          delete currentStateCopy[key];
        }
        break;

      default:
        break;
    }

    history.push({ ...currentStateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
