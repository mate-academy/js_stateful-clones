'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];
  let cloneObject = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const value in extraData) {
          cloneObject[value] = extraData[value];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneObject[key];
        }
        break;
      case 'clear':
        cloneObject = {};
        break;
      default:
        break;
    }
    cloneState.push({ ...cloneObject });
  }

  return cloneState;
}

module.exports = transformStateWithClones;
