'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateModify = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateModify, action.extraData);

        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateModify[keyToRemove];
        }

        break;

      case 'clear':
        for (const key in stateModify) {
          delete stateModify[key];
        }

        break;
    }

    states.push({ ...stateModify });
  }

  return states;
}

module.exports = transformStateWithClones;
