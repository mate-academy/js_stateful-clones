'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const newArr = [];

  for (const action of actions) {
    const check = Object.values(action);

    switch (check[0]) {
      case 'clear' :
        Object.keys(newState).forEach(key => delete newState[key]);
        break;
      case 'addProperties' :
        Object.assign(newState, check[1]);
        break;
      case 'removeProperties' :
        for (const property of check[1]) {
          delete newState[property];
        }
        break;
      default:
        break;
    }
    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;
