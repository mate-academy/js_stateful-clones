'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          stateCopy = { ...stateCopy, ...action.extraData };
        }
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      default:
    }

    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
