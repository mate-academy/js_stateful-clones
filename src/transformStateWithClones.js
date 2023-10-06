'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let eachState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let cloneVersion = { ...eachState };

    switch (type) {
      case 'addProperties':
        Object.assign(cloneVersion, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneVersion[key];
        }
        break;

      case 'clear':
        cloneVersion = {};
        break;

      default:
        return 'Error : Type Unknown';
    }
    eachState = { ...cloneVersion };

    const clone = { ...cloneVersion };

    allStates.push(clone);
  }

  return allStates;
}

module.exports = transformStateWithClones;
