'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const states = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(copy, act.extraData);

      const copyState = { ...copy };

      states.push(copyState);
    }

    if (act.type === 'removeProperties') {
      act.keysToRemove.forEach(key => delete copy[key]);

      const copyState = { ...copy };

      states.push(copyState);
    }

    if (act.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }

      const copyState = { ...copy };

      states.push(copyState);
    }
  }

  return states;
}

module.exports = transformStateWithClones;
