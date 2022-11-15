'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const clones = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'clear':
        currentState = {};
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete currentState[key];
        });
    }

    clones.push({ ...currentState });
  });

  return clones;
}

module.exports = transformStateWithClones;
