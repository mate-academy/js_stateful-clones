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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          tmpState[prop] = action.extraData[prop];
        }
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete tmpState[prop];
        }
        break;

      case 'clear':
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
