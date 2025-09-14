'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const act of actions) {
    let nextState;

    switch (act.type) {
      case 'addProperties':
        nextState = { ...stateCopy, ...act.extraData };
        break;

      case 'removeProperties':
        nextState = { ...stateCopy };
        if (Array.isArray(act.keysToRemove)) {
          for (const key of act.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...stateCopy };
        break;
    }

    result.push({ ...nextState });

    stateCopy = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;