'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let states = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      states = { ...states, ...action.extraData };
      result.push({ ...states });
    }

    if (action.type === 'removeProperties') {
      states = { ...states };

      for (const key of action.keysToRemove) {
        delete states[key];
      }
      result.push({ ...states });
    }

    if (action.type === 'clear') {
      states = {};
      result.push({ ...states });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
