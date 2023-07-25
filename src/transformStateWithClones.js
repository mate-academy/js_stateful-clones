'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// function deepClone(obj) {
//   const clone = {};

//   for (const key in obj) {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       clone[key] = deepClone(obj[key]);
//     } else {
//       clone[key] = obj[key];
//     }
//   }

//   return clone;
// }

function transformStateWithClones(state, actions) {
  const actionsOfState = [];
  const stateClone = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(element => delete stateClone[element]);
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        Error('sth gone wrong :(');
        break;
    }

    actionsOfState.push(Object.assign({}, stateClone));
  }

  return actionsOfState;
}

module.exports = transformStateWithClones;
