'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tmp = [];
  let tmpState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        tmpState = {};
        break;

      case 'addProperties':
        tmpState = { ...tmpState, ...action.extraData };
        break;

      case 'removeProperties':
        tmpState = { ...tmpState };

        for (const key of action.keysToRemove) {
          delete tmpState[key];
        }
        break;

      default:
        break;
    }

    tmp.push({ ...tmpState });
  }

  return tmp;
}
module.exports = transformStateWithClones;
