'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// const state = {
//   foo: 'bar',
//   bar: 'foo',
// };

// const actions = [
//   {
//     type: 'addProperties',
//     extraData: { yet: 'another property' },
//   },
//   { type: 'clear' },
//   {
//     type: 'addProperties',
//     extraData: { foo: 'bar', name: 'Jim' },
//   },
// ];
let obj = {};

function transformStateWithClones(state, actions) {
  const arr = [];

  for (const action of actions) {
    obj = { ...state };

    switch (action.type) {
      case 'addProperties':
        addProperties(state, action.extraData);

        break;
      case 'removeProperties':
        removeProperties(state, action.keysToRemove);

        break;
      case 'clear':
        clear(state);

        break;
    }
    arr.push(obj);
  }

  return arr;
}

function addProperties(state, extraData) {
  Object.assign(obj, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete obj[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
