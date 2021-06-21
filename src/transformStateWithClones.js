'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = {};
  const result = [];

  Object.assign(cloneState, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const element in cloneState) {
          delete cloneState[element];
        }
        result.push(Object.assign({}, cloneState));
        break;

      case 'addProperties':
        Object.assign(cloneState, actions[i].extraData);
        result.push(Object.assign({}, cloneState));
        break;

      case 'removeProperties':
        for (let index = 0; index < actions[i].keysToRemove.length; index++) {
          delete cloneState[actions[i].keysToRemove[index]];
        }
        result.push(Object.assign({}, cloneState));
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
