'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const toRemove = [];

  for (let i = 0; i < actions.length; i++) {
    clones[i] = {};
    toRemove[i] = [];
  }

  switch (actions[0]['type']) {
    case 'addProperties':
      Object.assign(clones[0], state, actions[0]['extraData']);
      break;
    case 'removeProperties':
      Object.assign(clones[0], state);
      Object.assign(toRemove[0], actions[0]['keysToRemove']);
      break;
    case 'clear':
      Object.assign(clones[0], {});
      break;
  }

  if (toRemove[0].length > 0) {
    for (let i = 0; i < toRemove[0].length; i++) {
      delete clones[0][toRemove[0][i]];
    }
  }

  if (actions.length > 1) {
    for (let i = 1; i < clones.length; i++) {
      switch (actions[i]['type']) {
        case 'addProperties':
          Object.assign(clones[i], actions[i]['extraData'], clones[i - 1]);
          break;
        case 'removeProperties':
          Object.assign(toRemove[i], actions[i]['keysToRemove']);
          Object.assign(clones[i], clones[i - 1]);

          for (let t = 0; t < toRemove[i].length; t++) {
            delete clones[i][toRemove[i][t]];
          }
          break;
        case 'clear':
          Object.assign(clones[i], {});
          break;
      }
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
