'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const nState = Object.assign({}, state);
  const nStateArray = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        Object.keys(nState).forEach(key => {
          delete nState[key];
        });
        break;
      case 'addProperties':
        Object.assign(nState, act.extraData);
        break;
      case 'removeProperties':
        act.keysToRemove.forEach(element => {
          delete nState[element];
        });
        break;
      default:
        return 'wrong action in actions';
    }

    nStateArray.push({ ...nState });
  }

  return nStateArray;
}

module.exports = transformStateWithClones;
