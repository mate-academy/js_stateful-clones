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
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
