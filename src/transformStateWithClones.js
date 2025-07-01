'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const history = [];

  for (const indx in actions) {
    if (actions[indx].type === 'addProperties') {
      Object.assign(stateClone, actions[indx].extraData);
    }

    if (actions[indx].type === 'removeProperties') {
      for (const key of actions[indx].keysToRemove) {
        if (Object.hasOwn(stateClone, key)) {
          delete stateClone[key];
        }
      }
    }

    if (actions[indx].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    history.push(Object.assign({}, stateClone));
  }

  return history;
}

module.exports = transformStateWithClones;
