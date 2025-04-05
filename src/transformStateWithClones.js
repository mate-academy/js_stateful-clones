'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const nState = Object.assign({}, state);
  const objArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(nState, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete nState[value];
        }
        break;

      case 'clear':
        for (const key in nState) {
          delete nState[key];
        }
        break;
      default:
        objArray.push({ ...nState });
    }
    objArray.push({ ...nState });
  }

  return objArray;
}

module.exports = transformStateWithClones;
