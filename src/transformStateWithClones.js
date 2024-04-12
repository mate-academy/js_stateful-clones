'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// first variant

// function transformStateWithClones(state, actions) {
//   const stateHistory = [];
//   const stateCopy = { ...state };

//   for (const action of actions) {
//     if (action.type === 'clear') {
//       for (const key in stateCopy) {
//         delete stateCopy[key];
//       }
//     }

//     if (action.type === 'addProperties') {
//       Object.assign(stateCopy, action.extraData);
//     }

//     if (action.type === 'removeProperties') {
//       for (const key of action.keysToRemove) {
//         delete stateCopy[key];
//       }
//     }
//     stateHistory.push({ ...stateCopy });
//   }

//   return stateHistory;
// }

// second variant

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        clear(stateCopy);
        break;

      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

function clear(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

module.exports = transformStateWithClones;
