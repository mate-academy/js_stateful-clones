'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const output = [];
  let currState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currState = Object.assign(currState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currState[key];
        }
        break;

      case 'clear':
        currState = {};
        break;
    }
    output.push(Object.assign({}, currState));
  }

  return output;
}

module.exports = transformStateWithClones;
