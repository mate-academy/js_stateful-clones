'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = {};
  const stateRecord = [];

  newState = Object.assign(newState, state);

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(newState, actions[key].extraData);
      stateRecord.push(Object.assign({}, newState));
    } else if (actions[key].type === 'removeProperties') {
      for (const keysToRemove of actions[key].keysToRemove) {
        delete newState[keysToRemove];
      }
      stateRecord.push(Object.assign({}, newState));
    } else if (actions[key].type === 'clear') {
      newState = {};
      stateRecord.push(Object.assign({}, newState));
    }
  }

  return stateRecord;
}

module.exports = transformStateWithClones;
