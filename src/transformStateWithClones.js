'use strict';

const stateObject = {
  foo: 'bar',
  name: 'Jim',
  another: 'one',
};

const stateAction = [
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
];

transformStateWithClones(stateObject, stateAction);

function transformStateWithClones(state, actions) {
  const result = [];

  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }

        break;

      case 'clear':
        newState = {};
        break;

      default:
        return null;
    }

    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
