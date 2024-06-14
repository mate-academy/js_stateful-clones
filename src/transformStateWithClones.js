'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const massState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
      break;

      case 'removeProperties':
        for (const del of keysToRemove) {
          delete stateCopy[del];
        }
      break;


      case 'clear':
        stateCopy = {};
      break;

    }
    massState.push({ ...stateCopy });
  }

  return massState;
}
module.exports = transformStateWithClones;
