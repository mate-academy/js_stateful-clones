'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        stateClones.push(stateClone);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }

        stateClones.push(stateClone);
        break;

      case 'clear':
        for (const prop in stateClone) {
          delete stateClone[prop];
        }
        stateClones.push(stateClone);
        break;

      default:

        throw new Error();

        // return 'Something went worng with your inputs'
        //   + ', Please check and enter again';
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
