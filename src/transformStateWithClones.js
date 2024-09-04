'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newAction = [];
  let stateClones = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        stateClones = {};
        break;
      }

      case 'addProperties': {
        stateClones = { ...stateClones, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateClones[key];
        }
        break;
      }

      default:
        break;
    }

    newAction.push({ ...stateClones });
  }

  return newAction;
}

module.exports = transformStateWithClones;
