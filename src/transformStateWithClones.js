'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // eslint-disable-next-line no-undef
  let stateCopy = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties': {
        const tempCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete tempCopy[key];
        }
        stateCopy = tempCopy;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
