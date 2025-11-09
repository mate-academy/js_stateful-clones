'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const history = [];

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'clear') {
      current = {};
    } else if (type === 'addProperties') {
      current = { ...current, ...extraData };
    } else if (type === 'removeProperties') {
      current = Object.fromEntries(
        Object.entries(current).filter(([key]) => !keysToRemove.includes(key)),
      );
    }

    history.push(current);
  }

  return history;
}

module.exports = transformStateWithClones;
