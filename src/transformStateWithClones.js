'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const actionHistory = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete copy[keyRemove];
        }
        break;

      case 'clear':
        for (const copyKey in copy) {
          delete copy[copyKey];
        }
    }
    actionHistory.push(Object.assign({}, copy));
  }

  return actionHistory;
}
// console.log(function transformStateWithClones({foo: 'bar', bar: 'foo'},[
//   {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//   {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//   {type: 'addProperties', extraData: {another: 'one'}}
// ])
module.exports = transformStateWithClones;
