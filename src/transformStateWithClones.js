'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesArray = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneState = {
          ...cloneState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        cloneState = {};
        break;
    }

    clonesArray.push({ ...cloneState });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
