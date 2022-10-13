'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };
  const pushToResult = () => {
    result.push({ ...copyState });
  };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        const propertiesToAdd = action.extraData;

        Object.assign(copyState, propertiesToAdd);
        break;

      case 'removeProperties':
        const propertiesToRemove = action.keysToRemove;

        propertiesToRemove.forEach(property => {
          delete copyState[property];
        });
        break;

      case 'clear':
        copyState = {};
    }

    pushToResult();
  });

  return result;
}

module.exports = transformStateWithClones;
