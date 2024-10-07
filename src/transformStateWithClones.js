'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const newState = stateArr.length
      ? { ...stateArr[stateArr.length - 1] }
      : { ...state };

    switch (type) {
      case 'addProperties':
        stateArr.push(Object.assign(newState, extraData));
        break;

      case 'removeProperties':
        if (!keysToRemove.length) {
          stateArr.push(newState);
          break;
        }

        for (const key of keysToRemove) {
          if (Object.hasOwn(newState, key)) {
            delete newState[key];
          }
        }
        stateArr.push(newState);
        break;

      case 'clear':
        stateArr.push({});
        break;
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;

transformStateWithClones({ foo: 'bar', bar: 'foo' }, [
  {
    type: 'addProperties',
    extraData: {
      name: 'Jim',
      hello: 'world',
    },
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

// console.log('res', res);
