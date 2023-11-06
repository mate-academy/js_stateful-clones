'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesArray = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          cloneState[key] = action.extraData[key];
        }
        clonesArray.push({ ...cloneState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        clonesArray.push({ ...cloneState });
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        clonesArray.push({});
        break;
    }
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
