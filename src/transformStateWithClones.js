'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_HISTORY = [];

  let stateClone = { ...state };

  for (const action of actions) {
    const VALUES = Object.values(action);

    if (VALUES[0] === 'addProperties') {
      Object.assign(stateClone, VALUES[1]);
    }

    if (VALUES[0] === 'removeProperties') {
      for (const key of VALUES[1]) {
        delete stateClone[key];
      }
    }

    if (VALUES[0] === 'clear') {
      stateClone = {};
    }

    STATE_HISTORY.push({ ...stateClone });
  }

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;
