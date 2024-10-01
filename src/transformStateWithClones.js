'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const state = {
  foo: 'bar',
  name: 'Jim',
  another: 'one',
};

function transformStateWithClones(currentState, actions) {
  const history = [];
  let clonedState = Object.assign({}, currentState);

  actions.forEach((obj) => {
    if (obj.type === 'clear') {
      clonedState = {};
      history.push({});
    }

    if (obj.type === 'addProperties') {
      clonedState = { ...clonedState, ...obj.extraData };
      history.push({ ...clonedState });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete clonedState[key];
      }

      history.push({ ...clonedState });
    }
  });

  return history;
}

transformStateWithClones(state, [
  {
    type: 'removeProperties',
    keysToRemove: ['another'],
  },
  { type: 'clear' },
  { type: 'clear' },
  { type: 'clear' },
  {
    type: 'addProperties',
    extraData: { yet: 'another property' },
  },
  { type: 'clear' },
  {
    type: 'addProperties',
    extraData: {
      foo: 'bar',
      name: 'Jim',
    },
  },
  {
    type: 'removeProperties',
    keysToRemove: ['name', 'hello'],
  },
]);

// console.log(cloned);

module.exports = transformStateWithClones;
