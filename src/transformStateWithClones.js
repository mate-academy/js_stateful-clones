'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let STATE_COPY = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(STATE_COPY, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const deleteKeys of action.keysToRemove) {
        delete STATE_COPY[deleteKeys];
      }
    }

    if (action.type === 'clear') {
      STATE_COPY = {};
    }

    result.push({ ...STATE_COPY });
  }

  return result;
}

module.exports = transformStateWithClones;
