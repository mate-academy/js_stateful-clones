'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        history.push({ ...copyState });
        break;
      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        history.push({ ...copyState });
        break;
      case 'clear':
        clearProperties(copyState);
        history.push({ ...copyState });
        break;
    }
  }

  return history;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

// function transformState(state, actions) {
//   for (const action of actions) {
//     switch (action.type) {
//       case 'addProperties':
//         addProperties(state, action.extraData);
//         break;

//       case 'removeProperties':
//         removeProperties(state, action.keysToRemove);
//         break;

//       case 'clear':
//         clearProperties(state);
//         break;
//     }
//   }
// }

// function addProperties(state, extraData) {
//   Object.assign(state, extraData);
// }

// function removeProperties(state, keysToRemove) {
//   for (const key of keysToRemove) {
//     delete state[key];
//   }
// }

// function clearProperties(state) {
//   for (const key in state) {
//     delete state[key];
//   }
// }

module.exports = transformStateWithClones;
