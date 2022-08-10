'use strict';

function transformStateWithClones(state, actions) {
  const result = [];

  let stateful = { ...state };
  let copy = { ...state };
  const copyClear = { ...state };

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
        for (const keys in copyClear) {
          delete copyClear[keys];
        }
        copy = { ...copyClear };
        result.push(copyClear);
        break;

      default: throw Error;
    }
  }

  return (result);
}

module.exports = transformStateWithClones;
