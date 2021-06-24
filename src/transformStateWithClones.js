'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  const stateClone = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateClone[keyToRemove];
        }

        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        break;
    }

    stateClones.push({ ...stateClone });
  });

  return stateClones;
}

module.exports = transformStateWithClones;
