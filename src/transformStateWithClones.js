'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          const { [key]: deletedKey, ...rest } = stateCopy;

          stateCopy = rest;
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }

    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
