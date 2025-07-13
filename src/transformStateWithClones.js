'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// ------------------- FIRST VARIANT -------------------

// function transformStateWithClones(state, actions) {
//   let prevState = { ...state };
//   const history = [];

//   for (const action of actions) {
//     let newState;

//     switch (action.type) {
//       case 'addProperties':
//         newState = { ...prevState, ...action.extraData };
//         break;

//       case 'removeProperties':
//         newState = { ...prevState };

//         for (const key of action.keysToRemove) {
//           delete newState[key];
//         }
//         break;

//       case 'clear':
//         newState = {};
//         break;

//       default:
//         throw new Error(`Unknown action type: ${action.type}`);
//     }

//     history.push(newState);
//     prevState = newState;
//   }

//   return history;
// }

// ------------------- SECOND VARIANT -------------------

function transformStateWithClones(state, actions) {
  return actions.reduce((history, action) => {
    const prev = history.at(-1) || state;
    // "|| state" needed for the very first iteration.
    // When the "prev" object is empty (at the beginning),
    // we take "state" as a basis.
    let nextState;

    if (action.type === 'addProperties') {
      nextState = { ...prev, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      nextState = { ...prev };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      nextState = {};
    } else {
      throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(nextState);

    return history;
  }, []);
}

module.exports = transformStateWithClones;
