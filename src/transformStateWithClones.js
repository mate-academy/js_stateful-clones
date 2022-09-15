'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const totalPropertys = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        totalPropertys.push({
          ...copyState = {
            ...copyState, ...action.extraData,
          },
          ...action.extraData,
        });
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete copyState[property];
        }

        totalPropertys.push({
          ...copyState,
          ...action.extraData,
        });
        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }

        totalPropertys.push(copyState);
        break;
    }
  }

  return totalPropertys;
}

module.exports = transformStateWithClones;
