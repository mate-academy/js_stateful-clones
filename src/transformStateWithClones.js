'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const types = [];
  let copyState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(copyState, actions[i].extraData);

        const objForAdd = Object.assign({}, copyState);

        types.push(objForAdd);
        break;
      }

      case 'removeProperties': {
        for (const key of actions[i].keysToRemove) {
          delete copyState[key];
        }

        const objForAdd = Object.assign({}, copyState);

        types.push(objForAdd);
        break;
      }

      case 'clear': {
        copyState = {};

        const objForAdd = Object.assign({}, copyState);

        types.push(objForAdd);
        break;
      }
    }
  }

  return types;
}

module.exports = transformStateWithClones;
