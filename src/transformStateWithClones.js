'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
 function transformStateWithClones(state, actions) {
  const result = [];
  let list = Object.assign({}, state);

  for (let j = 0; j < actions.length; j++) {
    if (actions[j].type === 'addProperties') {
      const adder = actions[j].extraData;

      result[j] = Object.assign({}, list, adder);
      list = Object.assign(list, result[j]);
    } else if (actions[j].type === 'removeProperties') {
      if ((Object.values(actions[j].keysToRemove)).length > 0) {
        for (const i of Object.values(actions[j].keysToRemove)) {
          delete list[i];
        }
        result[j] = Object.assign({}, list);
      } else {
        return [list];
      }
    } else if (actions[j].type === 'clear') {
      for (let i = 0; i < (Object.keys(state)).length; i++) {
        list = Object.assign({});
        result[j] = {};
      }
    }
  }

  return result;
}


// module.exports = transformStateWithClones;

const state = {
  foo: 'bar', name: 'Jim', another: 'one',
};

transformStateWithClones(state, [
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
])

