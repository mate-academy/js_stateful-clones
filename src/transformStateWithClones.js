'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const logs = [];
  let draftState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      draftState = Object.assign(draftState, action.extraData);
      logs.push({ ...draftState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete draftState[key];
      }
      logs.push({ ...draftState });
    }

    if (action.type === 'clear') {
      draftState = {};
      logs.push({ ...draftState });
    }
  }

  return logs;
}

module.exports = transformStateWithClones;
