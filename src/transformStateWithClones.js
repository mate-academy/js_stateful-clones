'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const nextState = { ...stateCopy };

        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });

        stateCopy = nextState;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    res.push({ ...stateCopy });
  }

  return res;
}

module.exports = transformStateWithClones;
