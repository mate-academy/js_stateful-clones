'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const nextClone = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(nextClone, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextClone[key];
        }

        break;
      case 'clear':
        for (const key in nextClone) {
          delete nextClone[key];
        }

        break;
      default:
        throw new Error(`No action type - '${action.type}'`);
    }

    clones.push({ ...nextClone });
  });

  return clones;
}

module.exports = transformStateWithClones;
