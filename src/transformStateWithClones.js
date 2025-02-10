'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;
      case 'clear':
        currentState = {};
        break;
    }
    history.push({ ...currentState });
  });

  return history;
}

module.exports = transformStateWithClones;


const stateHistory = transformStateWithClones(state, [
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

console.log(stateHistory);
