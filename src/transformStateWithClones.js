'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        throw Error('Unknown action');
    }
    states.push({ ...cloneState });
  }

  return states;
}

module.exports = transformStateWithClones;
