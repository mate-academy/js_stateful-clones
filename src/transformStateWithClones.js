'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const log = [];
  let copiedState = structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copiedState = {};
        break;
      case 'addProperties':
        Object.assign(copiedState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        break;
      default:
    }
    log.push(Object.assign({}, copiedState));
  }

  return log;
}

module.exports = transformStateWithClones;
