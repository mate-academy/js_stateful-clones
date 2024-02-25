'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const mass = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(copy, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (const a of actions[i].keysToRemove) {
        delete copy[a];
      }
    } else if (actions[i].type === 'clear') {
      for (const b in copy) {
        delete copy[b];
      }
    }
    mass.push({ ...copy });
  }

  return mass;
}

module.exports = transformStateWithClones;
