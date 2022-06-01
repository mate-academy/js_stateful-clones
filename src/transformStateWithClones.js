'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

//  const state = {foo: 'bar', bar: 'foo'};
//  const actions = [
//    {type: 'addProperties', extraData: {name: 'Jim', hello: 'world'}},
//    {type: 'removeProperties', keysToRemove: ['bar', 'hello']},
//    {type: 'addProperties', extraData: {another: 'one'}}
//  ];

//  transformStateWithClones(state, actions);

function transformStateWithClones(state, actions) {
  const result = [];
  let copied = { ...state };

  for (const action of actions) {
    copied = { ...copied };

    switch (action.type) {
      case 'addProperties':
        Object.assign(copied, action.extraData);
        result.push(copied);
        break;

      case 'removeProperties':
        makeRemove(copied, action.keysToRemove);
        result.push(copied);
        break;

      case 'clear':
        clear(copied);
        result.push(copied);
        break;
    }
  }

  // console.log(result);
  return result;
}

function makeRemove(state, props) {
  for (const prop of props) {
    delete state[prop];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
