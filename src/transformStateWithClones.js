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

  for (const item of actions) {
    switch (item['type']) {
      case 'addProperties':
        Object.assign(stateClone, item['extraData']);
        clones.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const x of item['keysToRemove']) {
          delete stateClone[x];
        }
        clones.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        clones.push({ ...stateClone });
        break;
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
