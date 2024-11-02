'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  actions.forEach((arrayObj) => {
    if (arrayObj.type === 'clear') {
      currentState = {};
    }

    if (arrayObj.type === 'addProperties') {
      for (const key in arrayObj.extraData) {
        currentState[key] = arrayObj.extraData[key];
      }
    }

    if (arrayObj.type === 'removeProperties') {
      for (const key of arrayObj.keysToRemove) {
        delete currentState[key];
      }
    }
    result.push({ ...currentState });
  });

  // for(let key in currentState) {
  // }
  return result;
}

// const state = {
//   foo: 'bar',
//   bar: 'foo',
// };

// const stateHistory = transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: { name: 'Jim', hello: 'world' },
//   },
//   {
//     type: 'removeProperties',
//     keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties',
//     extraData: { another: 'one' },
//   },
// ]);

// console.log(stateHistory);
// // [
// //   { foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world' },
// //   { foo: 'bar', name: 'Jim' },
// //   { foo: 'bar', name: 'Jim', another: 'one' },
// // ]
module.exports = transformStateWithClones;
