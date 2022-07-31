'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let stateful = { ...state };
  let copy = { ...state };
  let copyClear = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
      result.push(copy);
      stateful = { ...copy };
      copyClear = { ...copy };
    }

    if (action.type === 'removeProperties') {
      for (const ch of action.keysToRemove) {
        delete stateful[ch];
      }
      result.push(stateful);
      copy = { ...stateful };
      copyClear = { ...stateful };
    }

    if (action.type === 'clear') {
      for (const keys in copyClear) {
        delete copyClear[keys];
      }
      result.push(copyClear);
      copy = { ...copyClear };
      stateful = { ...copyClear };
    }
  }

  return (result);
}

module.exports = transformStateWithClones;
