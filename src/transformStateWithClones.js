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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear': {
        stateClones = {};
        break;
      }

      case 'addProperties': {
        stateClones = { ...stateClones, ...extraData };
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
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
