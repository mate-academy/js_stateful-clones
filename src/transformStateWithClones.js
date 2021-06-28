'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const tmpState = Object.assign({}, state);

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      for (const prop in actions[action]['extraData']) {
        tmpState[prop] = actions[action]['extraData'][prop];
      }
    } else if (actions[action].type === 'removeProperties') {
      for (const prop of actions[action]['keysToRemove']) {
        if (tmpState.hasOwnProperty(prop)) {
          delete tmpState[prop];
        }
      }
    } else if (actions[action].type === 'clear') {
      for (const prop in tmpState) {
        delete tmpState[prop];
      }
    }

    const objForAdd = Object.assign({}, tmpState);

    states.push(objForAdd);
  }

  return states;
}

module.exports = transformStateWithClones;
