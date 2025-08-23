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

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        if (act.extraData && typeof act.extraData === 'object') {
          stateCopy = { ...stateCopy, ...act.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(act.keysToRemove)) {
          stateCopy = { ...stateCopy };

          for (const key of act.keysToRemove) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        throw new Error('Unknown action type: ' + act.type);
    }
    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
