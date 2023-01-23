'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const state1 = {
  foo: 'bar', bar: 'foo',
};

const actions1 = [
  {
    type: 'removeProperties', keysToRemove: ['another'],
  },
  { type: 'clear' },
  { type: 'clear' },
  { type: 'clear' },
  {
    type: 'addProperties', extraData: { yet: 'another property' },
  },
  { type: 'clear' },
  {
    type: 'addProperties',
    extraData: {
      foo: 'bar', name: 'Jim',
    },
  },
  {
    type: 'removeProperties', keysToRemove: ['name', 'hello'],
  },
];

function transformStateWithClones(state, actions) {
  const array = [];
  const tempSTate = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(tempSTate, action.extraData);
        array.push({ ...tempSTate });
        break;

      case 'removeProperties' :
        for (const item of action.keysToRemove) {
          delete tempSTate[item];
        }
        array.push({ ...tempSTate });
        break;

      case 'clear' :
        for (const key in tempSTate) {
          delete tempSTate[key];
        }
        array.push({ ...tempSTate });
        break;

      default :
        return array;
    }
  }

  return array;
}
transformStateWithClones(state1, actions1);
module.exports = transformStateWithClones;
