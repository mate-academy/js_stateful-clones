'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// function transformStateWithClones1(state, actions) {
//   const states = [];
//   const stateCopy = { ...state };

//   for (const action of actions) {
//     if (action.type === 'addProperties') {
//       Object.assign(stateCopy, action.extraData);
//     } else if (action.type === 'removeProperties') {
//       for (const key of action.keysToRemove) {
//         delete stateCopy[key];
//       }
//     } else if (action.type === 'clear') {
//       for (const prop in stateCopy) {
//         delete stateCopy[prop];
//       }
//     }
//     states.push({ ...stateCopy });
//   }

//   return states;
// }

function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties'):
        Object.assign(stateCopy, action.extraData);
        break;
      case (action.type === 'removeProperties'):
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        };
        break;
      case (action.type === 'clear'):
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        };
        break;
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
