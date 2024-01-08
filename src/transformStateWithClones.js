'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {

  function doAction(type, action) {
    switch (type) {
      case 'addProperties':
        console.log('addProperties');
        addProperties(state, action.extraData);
        break;

      case 'removeProperties':
        console.log('removeProperties');
        break;

      case 'clear':
        console.log('clear');
        break;
    }

    return;
  }

  function addProperties(state, data) {
    Object.assign(state, data);
    return;
  }



  for (const action of actions) {
    doAction(action.type, action);
    console.log(state);
  }

}

const state1 = {
  foo: 'bar', bar: 'foo',
};
const type = [
  {
    type: 'addProperties',
    extraData: {
      foo: 'new', hello: 'world',
    },
  },
];

transformStateWithClones(state1, type);

module.exports = transformStateWithClones;
