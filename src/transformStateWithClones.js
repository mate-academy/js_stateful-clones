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

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(stateClone, actions[i]['extraData']);
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (let x = 0; x < actions[i]['keysToRemove'].length; x++) {
        delete stateClone[actions[i]['keysToRemove'][x]];
      }
    }

    if (actions[i]['type'] === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    clones.push({ ...stateClone });
  }

  return clones;
}

module.exports = transformStateWithClones;
