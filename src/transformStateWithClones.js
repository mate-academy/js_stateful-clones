'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateGroup = [];

  let newState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });
    }

    if (action.type === 'clear') {
      newState = {};
    }

    stateGroup.push({ ...newState });
  });

  return stateGroup;
}

transformStateWithClones({ foo: 'bar', bar: 'foo' }, [
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
  {
    type: 'clear',
  },
  {
    type: 'addProperties',
    extraData: { another: 'two' },
  },
]);

module.exports = transformStateWithClones;

/*

  let newState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      newState = { ...newState };

      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });
    }

    if (action.type === 'clear') {
      newState = {};
    }

    stateGroup.push(newState);
  });

*/

/*

  state.forEach((newState) => {

console.log(newState)

  actions.forEach((action) => {

})

*/

/*

transformStateWithClones({ foo: 'bar', bar: 'foo' }, [
  { type: 'removeProperties', keysToRemove: ['foo'] },
  { type: 'addProperties', extraData: { name: 'Adrian' } },
  { type: 'clear' },
]);

*/
