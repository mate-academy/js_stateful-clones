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

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(cloneState, object.extraData);
        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
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
