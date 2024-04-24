'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const rez = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      rez.push({});
    }

    if (actions[i].type === 'addProperties' && rez.length > 0) {
      rez.push(Object.assign({}, rez[rez.length - 1], actions[i].extraData));
    }

    if (actions[i].type === 'addProperties' && rez.length === 0) {
      rez.push(Object.assign({}, state, actions[i].extraData));
    }

    if (actions[i].type === 'removeProperties' && rez.length > 0) {
      rez.push(Object.assign({}, rez[rez.length - 1]));

      for (let e = 0; e < actions[i].keysToRemove.length; e++) {
        delete rez[rez.length - 1][actions[i].keysToRemove[e]];
      }
    }

    if (actions[i].type === 'removeProperties' && rez.length === 0) {
      rez.push(Object.assign({}, state));

      for (let e = 0; e < actions[i].keysToRemove.length; e++) {
        delete rez[rez.length - 1][actions[i].keysToRemove[e]];
      }
    }
  }

  return rez;
}

module.exports = transformStateWithClones;
