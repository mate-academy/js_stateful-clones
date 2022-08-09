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
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        result.push(copy);
        stateful = { ...copy };
        copyClear = { ...copy };
        break;

      case 'removeProperties':
        for (const ch of action.keysToRemove) {
          delete stateful[ch];
        }
        result.push(stateful);
        copy = { ...stateful };
        copyClear = { ...stateful };
        break;

      case 'clear':
        for (const keys in copyClear) {
          delete copyClear[keys];
        }
        result.push(copyClear);
        copy = { ...copyClear };
        stateful = { ...copyClear };
        break;
    }
  }

  return (result);
}

module.exports = transformStateWithClones;
