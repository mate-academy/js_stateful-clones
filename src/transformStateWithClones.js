'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'clear':
        newState = {};
        break;

      case 'removeProperties':
        const remProp = action.keysToRemove;

        for (let j = 0; j < remProp.length; j++) {
          const t = remProp[j];

          delete newState[t];
        }
        break;

      default:
        throw Error('error');
    }
    arrState.push({ ...newState });
  }

  return arrState;
}

module.exports = transformStateWithClones;
