'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const result = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        prevState = {};
        break;
      case 'addProperties':
        prevState = { ...prevState, ...act.extraData };
        break;
      case 'removeProperties':
        const newState = { ...prevState };

        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        prevState = newState;
        break;
      default:
        throw new Error('Unknown action type: ' + act.type);
    }

    result.push({ ...prevState });
  }

  return result;
}

module.exports = transformStateWithClones;
