'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const state = {
  foo: 'bar',
  bar: 'foo',
};

const actions = [
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
];

function transformStateWithClones(initState, objActions) {
  const ArrState = [];
  let objChange = { ...initState };

  objActions.forEach((elem) => {
    // if (elem.type === 'addProperties') {
    //   Object.assign(objChange, elem.extraData);
    //   ArrState.push({ ...objChange });
    // }

    // if (elem.type === 'removeProperties') {
    //   elem.keysToRemove.forEach((key) => {
    //     delete objChange[key];
    //   });
    //   ArrState.push({ ...objChange });
    // }

    // if (elem.type === 'clear') {
    //   objChange = {};
    //   ArrState.push({ ...objChange });
    // }
    switch (elem.type) {
      case 'addProperties':
        Object.assign(objChange, elem.extraData);
        ArrState.push({ ...objChange });
        break;

      case 'removeProperties':
        elem.keysToRemove.forEach((key) => {
          delete objChange[key];
        });
        ArrState.push({ ...objChange });
        break;

      case 'clear':
        objChange = {};
        ArrState.push({ ...objChange });
        break;

      default:
        break;
    }
  });

  return ArrState;
}

transformStateWithClones(state, actions);
module.exports = transformStateWithClones;
