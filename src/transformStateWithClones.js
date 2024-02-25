'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateHistory = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        stateHistory.push({ ...cloneState });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete cloneState[key]);
        stateHistory.push({ ...cloneState });
        break;
      case 'clear':
        cloneState = {};
        stateHistory.push(cloneState);
        break;
    }
  }
  console.log(stateHistory);
  return stateHistory;
}

module.exports = transformStateWithClones;

// const stateHistory = [];
// let stateCopy = {};

// Object.assign(stateCopy, ...);
// stateHistory.push(stateCopy);

// for (const action of actions) {
//   switch (action.type) {
//     case 'addProperties':
//       const stateCopy = {};

//       Object.assign(stateCopy, action.extraData);
//       stateHistory.push(stateCopy);
//       break;
//     case 'removeProperties':
//       action.keysToRemove.forEach(key => delete stateCopy[key]);
//       stateHistory.push(stateCopy);
//       break;
//     case 'clear':
//       for (const key in stateCopy) {
//         delete stateCopy[key];
//         stateHistory.push(stateCopy);
//       }
//       break;
//   }
// }

// return stateHistory;
