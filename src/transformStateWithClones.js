'use strict';
function transformStateWithClones(state, actions) {
  let prev = { ...state };
  const history = [];

  for (const action of actions) {
    let next;

    if (action.type === 'clear') {
      next = {};
    } else if (action.type === 'addProperties') {
      const extra =
        action.extraData &&
        typeof action.extraData === 'object'
          ? action.extraData
          : {};
      next = { ...prev, ...extra };
    } else if (action.type === 'removeProperties') {
      const keys = Array.isArray(action.keysToRemove)
        ? action.keysToRemove
        : [];
      next = { ...prev };
      for (const key of keys) {
        delete next[key];
      }
    } else {
      next = { ...prev };
    }

    history.push(next);
    prev = next;
  }

  return history;
}

module.exports = transformStateWithClones;
module.exports.transformStateWithClones = transformStateWithClones;
