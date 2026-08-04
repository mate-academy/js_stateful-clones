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
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          const { [key]: _, ...rest } = stateCopy;

          stateCopy = rest;
        }
        break;
      }

      default:
        break;
    }

    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
