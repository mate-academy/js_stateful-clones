'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = { ...state };
  const history = [];

  for (const a of actions) {
    if (a.type === 'clear') {
      prev = {};
    } else if (a.type === 'addProperties') {
      prev = { ...prev, ...(a.extraData || {}) };
    } else if (a.type === 'removeProperties') {
      const toRemove = new Set(a.keysToRemove || []);

      prev = Object.fromEntries(
        Object.entries(prev).filter(([k]) => !toRemove.has(k)),
      );
    }
    history.push(prev);
  }

  return history;
}

module.exports = transformStateWithClones;
