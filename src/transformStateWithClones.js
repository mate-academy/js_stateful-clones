'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyOfState = { ...state };
  const array = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const keyOfState in copyOfState) {
          delete copyOfState[keyOfState];
        }
        break;

      default:
        break;
    }

    array.push(copyOfState);
    copyOfState = Object.assign({}, copyOfState);
  }

  return array;
}

module.exports = transformStateWithClones;
