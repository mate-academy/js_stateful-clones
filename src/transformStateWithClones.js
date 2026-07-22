'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
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
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
