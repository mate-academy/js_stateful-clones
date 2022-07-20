'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  function Clone(copy) {
    return Object.assign({}, copy);
  }

  const actionSteps = [];
  let copyState = Object.assign({}, state);

  for (const data of actions) {
    switch (data.type) {
      case 'clear':
        copyState = {};

        actionSteps.push(Clone(copyState));
        break;

      case 'removeProperties':
        for (const remove of data.keysToRemove) {
          delete copyState[remove];
        }

        actionSteps.push(Clone(copyState));
        break;

      case 'addProperties':
        Object.assign(copyState, data.extraData);

        actionSteps.push(Clone(copyState));
    }
  }

  return actionSteps;
}

module.exports = transformStateWithClones;
