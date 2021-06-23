'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transform = [];
  const states = { ...state };

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties' :
        Object.assign(states, value.extraData);
        break;

      case 'removeProperties' :
        for (const key of value.keysToRemove) {
          delete states[key];
        }
        break;

      case 'clear' :
        for (const key in states) {
          delete states[key];
        }
    }

    transform.push({ ...states });
  }

  return transform;
}

module.exports = transformStateWithClones;
