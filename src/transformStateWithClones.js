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
  const copyNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        result.push(copy);
        stateful = { ...copy };
        break;

      case 'removeProperties':
        for (const ch of action.keysToRemove) {
          delete stateful[ch];
        }
        result.push(stateful);
        copy = { ...stateful };
        break;

      case 'clear':
        for (const keys in copyNew) {
          delete copyNew[keys];
        }
        copy = { ...copyNew };
        result.push(copyNew);
        break;

      default: throw Error;
    }
  }

  return (result);
}

module.exports = transformStateWithClones;
