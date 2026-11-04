'use strict';

function transformStateWithClones(state, actions) {
  const history = [];
  let current = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    const next = { ...current };

    switch (type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = Object.assign(next, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete next[key];
        }
        current = next;
        break;

      default:
        current = next;
    }

    history.push(current);
  }

  return history;
}

module.exports = transformStateWithClones;
