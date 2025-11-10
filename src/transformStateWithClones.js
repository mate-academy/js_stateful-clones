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
    if (action.type === 'clear') {
      copiedState = {};
      log.push(Object.assign({}, copiedState));
    } else if (action.type === 'addProperties') {
      Object.assign(copiedState, action.extraData);
      log.push(Object.assign({}, copiedState));
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copiedState[key];
      }
      log.push(Object.assign({}, copiedState));
    }
  }

  return log;
}

module.exports = transformStateWithClones;
