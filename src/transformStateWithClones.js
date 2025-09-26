'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const Objstate = {
  foo: 'bar',
  bar: 'foo',
};

transformStateWithClones(Objstate, [
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
    extraData: { marina: 'leticia' },
  },
]);


function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = {...state };
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)){
          currentState = { ...currentState};
          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default :
    }
    history.push({ ...currentState});
  }
  return history;
};

module.exports = transformStateWithClones;


