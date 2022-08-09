'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let lastState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        // console.log('action:', action);

        const { extraData } = action;

        // console.log(extraData);

        const stateCopy = {
          ...lastState, ...extraData,
        };

        // console.log("lastState:", lastState);
        // console.log('extraData:', extraData);
        // console.log(stateCopy);
        lastState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        const stateCopy = { ...lastState };

        for (const value of keysToRemove) {
          delete stateCopy[value];
        }
        lastState = stateCopy;

        break;
      }

      case 'clear': {
        const stateEmpty = {};

        lastState = stateEmpty;
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
    history.push(lastState);
  }
  // console.log(lastState);
  // console.log(history);

  return history;
}

// const state = {
//   foo: 'bar', bar: 'foo',
// };

// transformStateWithClones(state, [
//   {
//     type: 'addProperties',
//     extraData: {
//       name: 'Jim', hello: 'world',
//     },
//   },
//   {
//     type: 'clear',
//   },
//   {
//     type: 'removeProperties', keysToRemove: ['bar', 'hello'],
//   },
//   {
//     type: 'addProperties', extraData: { another: 'one' },
//   },
// ]);

module.exports = transformStateWithClones;
