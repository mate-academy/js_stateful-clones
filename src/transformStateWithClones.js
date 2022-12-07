'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newActions = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete cloneState[prop];
        }
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        break;
    }
    newActions.push({ ...cloneState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
