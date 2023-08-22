'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CLONE_STATE = { ...state };
  const STATE_LOG = [];

  for (const action of actions) {
    applyAction(CLONE_STATE, action);
  }

  function applyAction(cloneState, action) {
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
        for (const key of Object.keys(cloneState)) {
          delete cloneState[key];
        }
        break;
    }
    STATE_LOG.push({ ...cloneState });
  }

  return STATE_LOG;
}

module.exports = transformStateWithClones;
