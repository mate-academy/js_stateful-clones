'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfState = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete copyState[removeKey];
        }
        break;

      case 'clear':
        for (const prop in copyState) {
          delete copyState[prop];
        }
        break;
    }

    arrayOfState.push({ ...copyState });
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
