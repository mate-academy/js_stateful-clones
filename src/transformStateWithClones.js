'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const transformHistory = [];

  for (let i = 0; i < actions.length; i += 1) {
    const act = actions[i];

    if (act.type === 'addProperties') {
      Object.assign(cloneState, act.extraData);
    }

    if (act.type === 'removeProperties') {
      for (const keys of act.keysToRemove) {
        delete cloneState[keys];
      }
    }

    if (act.type === 'clear') {
      for (const keys of Object.keys(cloneState)) {
        delete cloneState[keys];
      }
    }

    transformHistory.push({ ...cloneState });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
