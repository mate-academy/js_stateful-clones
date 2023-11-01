'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyOfState = { ...state };

  for (const element of actions) {
    switch (element.type) {
      case 'removeProperties':
        for (const item of element.keysToRemove) {
          delete copyOfState[item];
        }
        break;
      case 'addProperties':
        Object.assign(copyOfState, element.extraData);
        break;
      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
    }

    result.push(Object.assign({}, copyOfState));
  }

  return result;
}
module.exports = transformStateWithClones;
