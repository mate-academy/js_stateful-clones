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

    if (array[0] === 'addProperties') {
      const data = array[1];

      for (const key in data) {
        obj[key] = data[key];
      }
    }

    if (array[0] === 'removeProperties') {
      const data = array[1];

      for (let j = 0; j < data.length; j++) {
        delete obj[data[j]];
      }
    }

    if (array[0] === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }
    arr.push(Object.assign({}, obj));
  }

  return arr;
}

module.exports = transformStateWithClones;
