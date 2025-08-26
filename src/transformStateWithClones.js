'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  return actions.reduce((acc, action) => {
    const prev = acc.length ? acc[acc.length - 1] : state;
    let next;

    if (action.type === 'clear') {
      next = {};
    } else if (action.type === 'addProperties') {
      next = { ...prev, ...(action.extraData || {}) };
    } else if (action.type === 'removeProperties') {
      const ban = new Set(action.keysToRemove || []);

      next = Object.fromEntries(
        Object.entries(prev).filter(([k]) => !ban.has(k)),
      );
    } else {
      next = { ...prev };
    }

    acc.push(next);

    return acc;
  }, []);
}

module.exports = transformStateWithClones;
