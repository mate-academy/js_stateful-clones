'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versionsState = [];
  let copyState = { ...state };

  for (const elem of actions) {
    switch (true) {
      case elem.type === 'addProperties':
        for (const key in elem.extraData) {
          copyState[key] = elem.extraData[key];
        }
        break;

      case elem.type === 'removeProperties':
        for (const index of elem.keysToRemove) {
          delete copyState[index];
        }
        break;

      case elem.type === 'clear':
        copyState = {};
        break;
    }
    versionsState.push({ ...copyState });
  }

  return versionsState;
}

module.exports = transformStateWithClones;
