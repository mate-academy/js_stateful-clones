'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];

  actions.forEach((action) => {
    const clone = stateClones.length
      ? Object.assign({}, stateClones[stateClones.length - 1])
      : Object.assign({}, state);

    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      default:
        throw new Error('Something wrong, I can feel it');
    }

    stateClones.push(clone);
  });

  return stateClones;
}

module.exports = transformStateWithClones;
