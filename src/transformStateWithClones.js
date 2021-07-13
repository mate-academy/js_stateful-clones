'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = ({ ...state });
  const stateTransforms = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const keys of actions[i].keysToRemove) {
          delete stateClone[keys];
        };
        break;

      case 'clear':
        for (const keys in stateClone) {
          delete stateClone[keys];
        };
        break;
    }

    stateTransforms.push({ ...stateClone });
  }

  return stateTransforms;
}

module.exports = transformStateWithClones;
