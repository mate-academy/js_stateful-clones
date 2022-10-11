'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };
  const pushToResult = () => {
    result.push({ ...copyState });
  };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        const propertiesToAdd = action.extraData;

        Object.assign(copyState, propertiesToAdd);
        pushToResult();
        break;

      case 'removeProperties':
        const propertiesToRemove = action.keysToRemove;

        propertiesToRemove.forEach(property => {
          delete copyState[property];
        });
        pushToResult();
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        pushToResult();
    }
  });

  return result;
}

module.exports = transformStateWithClones;
