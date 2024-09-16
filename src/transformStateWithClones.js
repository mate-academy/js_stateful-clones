'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const rez = [];

  rez.push(Object.assign({}, state));

  for (let i = 0; i < actions.length; i++) {
    switch (true) {
      case actions[i].type === 'clear':
        rez.push({});

        break;
      case actions[i].type === 'addProperties':
        rez.push(Object.assign({}, rez[rez.length - 1], actions[i].extraData));

        break;
      case actions[i].type === 'removeProperties':
        rez.push(Object.assign({}, rez[rez.length - 1]));

        for (let e = 0; e < actions[i].keysToRemove.length; e++) {
          delete rez[rez.length - 1][actions[i].keysToRemove[e]];
        }

        break;
    }
  }
  rez.splice(0, 1);

  return rez;
}

module.exports = transformStateWithClones;
