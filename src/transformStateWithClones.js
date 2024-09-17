'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateSnapshots = [];
  const stateClone = { ...state };

  for (const action of actions) {
    transformState(stateClone, action);

    stateSnapshots.push({ ...stateClone });
  }

  return stateSnapshots;
}

/**
 * @param {Object} state
 * @param {Object} action
 */
function transformState(state, action) {
  const ACTION_ADD = 'addProperties';
  const ACTION_REMOVE = 'removeProperties';
  const ACTION_CLEAR = 'clear';
  const ERROR_MSG = 'Unknown action!';

  switch (action.type) {
    case ACTION_ADD:
      Object.assign(state, action.extraData);
      break;

    case ACTION_REMOVE:
      action.keysToRemove.forEach(key => delete state[key]);
      break;

    case ACTION_CLEAR:
      Object.keys(state).forEach(key => delete state[key]);
      break;

    default:
      throw new Error(ERROR_MSG);
  }
}

module.exports = transformStateWithClones;
