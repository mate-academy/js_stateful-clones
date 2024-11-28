'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key of Object.keys(action.extraData)) {
          newState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;

      default:
        throw new Error();
    }

    history.push(Object.assign({}, newState));
  }

  return history;
}

module.exports = transformStateWithClones;
