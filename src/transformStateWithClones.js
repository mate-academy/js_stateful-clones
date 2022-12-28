'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const res = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        obj = {
          ...obj,
          ...actions[i].extraData,
        };
        res.push({ ...obj });
        break;

      case 'removeProperties':
        for (const property of actions[i].keysToRemove) {
          delete obj[property];
        }
        res.push({ ...obj });
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        res.push({ ...obj });
    }
  }

  return res;
}

// console.log(transformStateWithClones({
//   foo: 'bar', bar: 'foo',
// }, [
//   {
//     type: 'addProperties', extraData: { yet: 'another property' },
//   },
//   { type: 'clear' },
//   {
//     type: 'addProperties',
//     extraData: {
//       foo: 'bar', name: 'Jim',
//     },
//   },
//   {
//     type: 'addProperties', extraData: { yet: 'another property' },
//   },
//   {
//     type: 'addProperties', extraData: { yet: 'another property' },
//   },
// ]));

module.exports = transformStateWithClones;
