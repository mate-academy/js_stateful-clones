'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateForResult = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      const addValues = actions[action].extraData;

      for (const addValue in addValues) {
        stateForResult[addValue] = addValues[addValue];
      }
      result.push(stateForResult);
    } else if (actions[action].type === 'removeProperties') {
      const removeKeys = actions[action].keysToRemove;

      for (const removeKey of removeKeys) {
        delete stateForResult[removeKey];
      }
      result.push(stateForResult);
    } else if (actions[action].type === 'clear') {
      for (const stateKey in stateForResult) {
        delete stateForResult[stateKey];
      }
      result.push(stateForResult);
    }
    stateForResult = { ...stateForResult };
  }

  return result;
}

module.exports = transformStateWithClones;
// const state = {foo: 'bar', bar: 'foo'};
// const actions = [
//   {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//   {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//   {type: 'addProperties', extraData: {another: 'one'}}
// ]
// console.log(transformStateWithClones(state, actions));
