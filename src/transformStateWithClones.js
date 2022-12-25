'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const newArr = [];

  for (const i of actions) {
    const check = Object.values(i);

    if (check[0] === 'clear') {
      newState = {};
      newArr.push({ ...newState });
    } else if (check[0] === 'addProperties') {
      Object.assign(newState, check[1]);
      newArr.push({ ...newState });
    } else if (check[0] === 'removeProperties') {
      for (const property of check[1]) {
        delete newState[property];
      }
      newArr.push({ ...newState });
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
