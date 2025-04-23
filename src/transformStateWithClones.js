'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let stateCopy = Object.assign({}, state);

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        stateCopy = Object.assign({}, stateCopy, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error(`Unknown type of act: ${act.type}`);
    }

    states.push(Object.assign({}, stateCopy));
  }

  return states;
}

module.exports = transformStateWithClones;
