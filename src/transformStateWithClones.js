'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const arrayOfCopies = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key in copyOfState) {
          if (action.keysToRemove.includes(key)) {
            delete copyOfState[key];
          }
        }
        break;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
    }

    arrayOfCopies.push({ ...copyOfState });
  }

  return arrayOfCopies;
}

module.exports = transformStateWithClones;
