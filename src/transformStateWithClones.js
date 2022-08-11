'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];

  let stateful = { ...state };
  let copy = { ...state };
  let copyNew = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
      result.push(copy);
      stateful = { ...copy };
      copyNew = { ...copy };
    }

    if (action.type === 'removeProperties') {
      for (const ch of action.keysToRemove) {
        delete stateful[ch];
      }
      result.push(stateful);
      copy = { ...stateful };
      copyNew = { ...stateful };
    }

    if (action.type === 'clear') {
      for (const keys in copyNew) {
        delete copyNew[keys];
      }
      result.push(copyNew);
      copy = { ...copyNew };
      stateful = { ...copyNew };
    }
  }

  return (result);
}
module.exports = transformStateWithClones;
