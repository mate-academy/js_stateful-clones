'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const m = [];
  let currentstate = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      currentstate = { ...currentstate, ...key.extraData };
    }

    if (key.type === 'removeProperties') {
      const nextState = { ...currentstate };

      for (const t of key.keysToRemove) {
        delete nextState[t];
      }
      currentstate = nextState;
    }

    if (key.type === 'clear') {
      currentstate = {};
    }

    m.push({ ...currentstate });
  }

  return m;
}

module.exports = transformStateWithClones;
