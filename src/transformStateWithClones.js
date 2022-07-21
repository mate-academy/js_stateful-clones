'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionSteps = [];
  let copyState = Object.assign({}, state);

  for (const data of actions) {
    switch (data.type) {
      case 'clear':
        copyState = {};
        break;

      case 'removeProperties':
        for (const remove of data.keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'addProperties':
        Object.assign(copyState, data.extraData);
        break;

      default :
        break;
    }

    actionSteps.push(Object.assign({}, copyState));
  }

  return actionSteps;
}

module.exports = transformStateWithClones;
