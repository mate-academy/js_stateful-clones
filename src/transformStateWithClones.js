/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(stateClone, item.extraData);
        break;

      case 'removeProperties':
        for (const property of item.keysToRemove) {
          delete stateClone[property];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    clones.push({ ...stateClone });
  }

  return clones;
}

module.exports = transformStateWithClones;
