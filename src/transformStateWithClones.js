'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const { type, extraData } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        stateClones.push(stateClone);
        break;

      case 'clear':
        stateClone = {};
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
