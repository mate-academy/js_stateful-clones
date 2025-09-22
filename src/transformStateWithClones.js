'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const clone = { ...state };
  const stateChanges = [];

  for (const { type, extraData = {}, keysToRemove = [] } of actions) {
    switch (type) {
      case 'addProperties': {
        add(clone, extraData);
        stateChanges.push({ ...clone });
        break;
      }

      case 'removeProperties': {
        remove(clone, keysToRemove);
        stateChanges.push({ ...clone });
        break;
      }

      case 'clear': {
        clear(clone);
        stateChanges.push({ ...clone });
        break;
      }
    }
  }

  return stateChanges;
}

const add = (obj, extraData) => {
  for (const key in extraData) {
    obj[key] = extraData[key];
  }
};

const remove = (obj, keysToRemove) => {
  for (const key of keysToRemove) {
    if (obj[key]) {
      delete obj[key];
    }
  }
};

const clear = (obj) => {
  for (const key in obj) {
    delete obj[key];
  }
};

transformStateWithClones({ foo: 'bar', name: 'Jim' }, [
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
]);

module.exports = transformStateWithClones;
