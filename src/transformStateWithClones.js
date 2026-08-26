'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let current = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = { ...current, ...act.extraData };
        break;

      case 'removeProperties':
        current = { ...current };

        for (const key of act.keysToRemove) {
          delete current[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${act.type}`);
    }

    states.push(current);
  }

  return states;
}

module.exports = transformStateWithClones;
