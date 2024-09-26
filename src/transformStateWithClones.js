'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    transformStateClone(action, stateClone);

    statesHistory.push({ ...stateClone });
  }

  return statesHistory;
}

function transformStateClone(action, stateClone) {
  const {
    type,
    extraData = {},
    keysToRemove = [],
  } = action;

  switch (type) {
    case 'addProperties':
      Object.assign(stateClone, extraData);

      break;
    case 'removeProperties':
      for (const property of keysToRemove) {
        delete stateClone[property];
      }

      break;
    case 'clear':
      for (const key in stateClone) {
        delete stateClone[key];
      }

      break;
    default:
      throw new Error('Unexpected action type', {
        type,
      });
  }
};

module.exports = transformStateWithClones;
