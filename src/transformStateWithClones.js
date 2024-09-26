'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newAction = [];
  let newState = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(newState, object.extraData);
        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
    }
    newAction.push({ ...newState });
  }

  return newAction;
}

module.exports = transformStateWithClones;
