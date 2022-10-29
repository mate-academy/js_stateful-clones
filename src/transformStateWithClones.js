'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let clone = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        clone = Object.assign({}, clone, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let a = 0; a < actions[i].keysToRemove.length; a++) {
          delete clone[actions[i].keysToRemove[a]];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    resultStates.push(clone);
    clone = Object.assign({}, resultStates[i]);
  }

  return resultStates;
}

module.exports = transformStateWithClones;
