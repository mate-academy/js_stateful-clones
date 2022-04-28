'use strict';
// transformStateWithClones(state, [
//   {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//   {type: 'clear'},
//   {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//   {type: 'addProperties', extraData: {another: 'one'}}
// ])

// [
//   {foo: 'bar', bar: 'foo', name: 'Jim', hello: 'world'},
//   {foo: 'bar', name: 'Jim'},
//   {foo: 'bar', name: 'Jim', another: 'one'}
// ].
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const res = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties' :
        Object.assign(currentState, obj.extraData);
        break;

      case 'clear':
        currentState = {};
        break;

      case 'removeProperties' :
        for (const item of obj.keysToRemove) {
          delete currentState[item];
        }
        break;
    }

    res.push({ ...currentState });
  }

  return res;
}

module.exports = transformStateWithClones;
