'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   const objMass = [];
//   let iteratorForMass = 0;

//   for (const iterator of actions) {
//     if (iterator.type === 'addProperties') {
//       // for (const key in iterator.extraData) {
//       //   objMass.push(...iterator.extraData[key]);
//       // }
//       objMass.push(state);
//       objMass[iteratorForMass] = Object.assign({ ...iterator.extraData });
//     } else if (iterator.type === 'removeProperties') {
//       objMass.push(state);
//       for (const iterator1 of iterator.keysToRemove) {
//         delete objMass[iteratorForMass][iterator1];
//       }
//     } else if (iterator.type === 'clear') {
//       objMass.push(state);
//       for (const key1 in objMass[iteratorForMass]) {
//         delete objMass[iteratorForMass][key1];
//       }
//     }
//     iteratorForMass++;
//   }
// }

function transformStateWithClones(state, actions) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`Input is invalid - ${typeof action}`);
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
