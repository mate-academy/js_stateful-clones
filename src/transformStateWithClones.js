'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    transformStateClone(action, stateClone);

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
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
      for (const key of keysToRemove) {
        delete stateClone[key];
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
}

module.exports = transformStateWithClones;
