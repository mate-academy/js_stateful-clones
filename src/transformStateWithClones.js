'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ARRAY_WITH_STATES = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        ARRAY_WITH_STATES.push({ ...stateCopy });
        break;

      case 'removeProperties':
        const newState = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        stateCopy = newState;
        ARRAY_WITH_STATES.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        ARRAY_WITH_STATES.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return ARRAY_WITH_STATES;
}

module.exports = transformStateWithClones;
