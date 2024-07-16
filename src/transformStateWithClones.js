'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   let stateClone = { ...state };
//   const list = [];

//   function removeProperties(obj, keysToRemove) {
//     for (let index = 0; index < keysToRemove.length; index++) {
//       delete stateClone[keysToRemove[index]];
//       delete obj[keysToRemove[index]];
//     }

//     return obj;
//   }

//   for (let index = 0; index < actions.length; index++) {
//     const item = actions[index];

//     switch (item.type) {
//       case 'addProperties':
//         stateClone = { ...stateClone, ...item.extraData };
//         list.push({ ...stateClone, ...item.extraData });
//         break;
//       case 'removeProperties':
//         list.push(removeProperties({ ...stateClone }, item.keysToRemove));
//         break;
//       case 'clear':
//         stateClone = {};
//         list.push({});
//         break;
//       default:
//         break;
//     }
//   }

//   return list;
// }

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        break;
    }

    const newStateClone = { ...stateClone };

    stateHistory.push(newStateClone);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
