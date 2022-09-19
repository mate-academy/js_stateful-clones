'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const arrayOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete copyState[property];
        }
        break;

      case 'clear':
        copyState = {};
        break;
    }

    arrayOfStates.push({ ...copyState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
