'use strict';

const state1 = {
  foo: 'bar',
  bar: 'foo',
};

const result = transformStateWithClones(state1, [
  {
    type: 'addProperties',
    extraData: { name: 'Jim', hello: 'world' },
  },
  {
    type: 'removeProperties',
    keysToRemove: ['bar', 'hello'],
  },
  {
    type: 'addProperties',
    extraData: { another: 'one' },
  },
]);


/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !action.keysToRemove.includes(key)
          )
        );
        break;

      case 'clear':
        currentState = {};
        break;

      default:

        continue;
    }

  
    resultArr.push({ ...currentState });
  }

  return resultArr;
}
console.log(result)
module.exports = transformStateWithClones;
