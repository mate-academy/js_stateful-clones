'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let current = { ...state };

  for (let action of actions) {
    switch (action.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = { ...current, ...action.extraData };
        break;

      case 'removeProperties':
        current = { ...current };
        for (let key of action.keysToRemove) {
          delete current[key];
        }
        break;

      default:
        break;
    }

    history.push({ ...current });
  }

  return history;
}
module.exports = transformStateWithClones;
