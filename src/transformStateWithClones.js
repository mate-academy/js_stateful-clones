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
        log.push(Object.assign({}, copiedState));
        break;
      case 'addProperties':
        Object.assign(copiedState, action.extraData);
        log.push(Object.assign({}, copiedState));
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        log.push(Object.assign({}, copiedState));
        break;
      default:
        log.push(Object.assign({}, copiedState));
    }
  }

  return log;
}

module.exports = transformStateWithClones;
