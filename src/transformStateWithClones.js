'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const prevState = Object.assign({}, state);
  const nextActions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        prevState[key] = action.extraData[key];
      }

      const obj = Object.assign({}, prevState);

      nextActions.push(obj);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete prevState[key];
      }

      const obj = Object.assign({}, prevState);

      nextActions.push(obj);
    }

    if (action.type === 'clear') {
      for (const key in prevState) {
        delete prevState[key];
      }

      const obj = Object.assign({}, prevState);

      nextActions.push(obj);
    }
  }

  return nextActions;
}

module.exports = transformStateWithClones;
