'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      result.push({});
      current = {};
    }

    if (action.type === 'addProperties') {
      let added = { ...current };

      added = Object.assign(added, action.extraData);

      result.push(added);
      current = added;
    }

    if (action.type === 'removeProperties') {
      const removed = { ...current };

      for (const property of action.keysToRemove) {
        delete removed[property];
      }
      result.push(removed);
      current = removed;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
