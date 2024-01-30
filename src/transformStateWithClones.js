'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// #region FIRST-SOLUTION
function transformStateWithClones(state, actions) {
  const finalStateHistory = [];
  const stateVersions = [];

  stateVersions[0] = { ...state };

  for (const action of actions) {
    const lastStateVersion = stateVersions[stateVersions.length - 1];
    let changedState;

    switch (action.type) {
      case 'addProperties':
        changedState = addProperties(lastStateVersion, action.extraData);
        break;
      case 'removeProperties':
        changedState = removeProperties(
          lastStateVersion, action.keysToRemove
        );
        break;
      default:
        changedState = {};
    }

    finalStateHistory.push(changedState);
    stateVersions.push(changedState);
  }

  return finalStateHistory;
}

function addProperties(state, extraData) {
  const changedState = {
    ...state,
    ...extraData,
  };

  return changedState;
}

function removeProperties(state, extraData) {
  const changedState = { ...state };

  for (const key of extraData) {
    delete changedState[key];
  }

  return changedState;
}
// #endregion

// #region SECOND-SOLUTION
// function transformStateWithClones(state, actions) {
//   const stateHistory = [];

//   for (let i = 0; i < actions.length; i++) {
//     let stateToChange;
//     let changedState;

//     if (i === 0) {
//       stateToChange = { ...state };
//     } else {
//       stateToChange = stateHistory[stateHistory.length - 1];
//     }

//     switch (actions[i].type) {
//       case 'addProperties':
//         changedState = addProperties(stateToChange, actions[i].extraData);
//         break;
//       case 'removeProperties':
//         changedState = removeProperties(
//           stateToChange, actions[i].keysToRemove
//         );
//         break;
//       default:
//         changedState = {};
//     }

//     stateHistory.push(changedState);
//   }

//   return stateHistory;
// }

// function addProperties(state, extraData) {
//   const changedState = {
//     ...state,
//     ...extraData,
//   };

//   return changedState;
// }

// function removeProperties(state, extraData) {
//   const changedState = { ...state };

//   for (const key of extraData) {
//     delete changedState[key];
//   }

//   return changedState;
// }
// #endregion

module.exports = transformStateWithClones;
