'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  const stateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;
      default:
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
