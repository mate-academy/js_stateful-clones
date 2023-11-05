'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfClones = [];
  const temporaryState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          temporaryState[key] = action.extraData[key];
        }
        arrayOfClones.push({ ...temporaryState });
        break;
      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete temporaryState[action.keysToRemove[i]];
        }
        arrayOfClones.push({ ...temporaryState });
        break;
      case 'clear':
        for (const key in temporaryState) {
          delete temporaryState[key];
        }
        arrayOfClones.push({});
        break;
    }
  }

  return arrayOfClones;
}
module.exports = transformStateWithClones;
