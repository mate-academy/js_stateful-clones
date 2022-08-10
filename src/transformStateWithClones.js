'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(cloneState, action.extraData);
        newState.push(Object.assign({}, cloneState));
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        newState.push(Object.assign({}, cloneState));
        break;
      }

      case 'clear': {
        for (const key in cloneState) {
          delete cloneState[key];
        }
        newState.push(Object.assign({}, cloneState));
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }
  }

  return newState;
}

transformStateWithClones({}, [
  {
    type: 'removeProperties', keysToRemove: ['test', 'bar'],
  },
]);
module.exports = transformStateWithClones;
