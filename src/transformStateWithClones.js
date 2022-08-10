'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = {};
  const arr = [];

  for (const key in state) {
    obj[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const array = Object.values(actions[i]);
    const data = array[1];

    switch (array[0]) {
      case 'addProperties':
        for (const key in data) {
          obj[key] = data[key];
        }
        break;

      case 'removeProperties':
        for (let j = 0; j < data.length; j++) {
          delete obj[data[j]];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;

      default:
    }
    arr.push(Object.assign({}, obj));
  }

  return arr;
}

module.exports = transformStateWithClones;
