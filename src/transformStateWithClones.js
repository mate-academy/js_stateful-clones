'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraDate);
        arr.push(newObj);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        arr.push(newObj);
        break;

      case 'clear':
        newObj = {};
        arr.push(newObj);
        break;
    }
  }

  return arr;
}

// const s = {
//   foo: 'bar', name: 'Jim', another: 'one',
// };

// const act = [
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
// ];

// console.log(transformStateWithClones(s, act));

module.exports = transformStateWithClones;
