'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let current = JSON.parse(JSON.stringify(state));
  const result = [];

  for (const index in actions) {
    const next = JSON.parse(JSON.stringify(current));
    const { type } = actions[index];

    switch (type) {
      case 'addProperties':
        Object.assign(next, actions[index].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[index].keysToRemove) {
          delete next[key];
        }
        break;

      case 'clear':
        for (const key in next) {
          delete next[key];
        }
        break;
    }

    result.push(next);
    current = next;
  }

  return result;
}

module.exports = transformStateWithClones;
