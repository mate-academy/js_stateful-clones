'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrayActions = [];

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
        for (const property in copyState) {
          delete copyState[property];
        }
        break;
    }
    arrayActions.push({ ...copyState });
  }

  return arrayActions;
}

module.exports = transformStateWithClones;
