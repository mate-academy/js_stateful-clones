'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const resultArr = [];

  for (const obj of actions) {
    if (obj['type'] === 'addProperties') {
      Object.assign(stateClone, obj['extraData']);

      resultArr.push({ ...stateClone });
    }

    if (obj['type'] === 'removeProperties') {
      for (const property of obj['keysToRemove']) {
        if (stateClone[property]) {
          delete stateClone[property];
        }
      }

      resultArr.push({ ...stateClone });
    }

    if (obj['type'] === 'clear') {
      stateClone = {};

      resultArr.push({});
    }
  }

  return resultArr;
}

// const state = {
//   foo: 'bar', bar: 'foo',
// };

// transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: {
//       name: 'Jim', hello: 'world',
//     },
//   },
//   {
//     type: 'removeProperties', keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties', extraData: { another: 'one' },
//   },
// ]);

module.exports = transformStateWithClones;
