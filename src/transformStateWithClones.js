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

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        const keysToRemove = new Set(action.keysToRemove);

        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(([key]) => !keysToRemove.has(key)),
        );
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push({ ...stateCopy });
  });

  return history;
}

module.exports = transformStateWithClones;
