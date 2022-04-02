'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const lastState = Object.assign({}, state);

  for (const action of actions) {
    const { extraData, type, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(lastState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete lastState[key];
        }
        break;

      case 'clear':
        for (const key in lastState) {
          delete lastState[key];
        }
        break;

      default:
        throw new Error(`Unsupported action type: ${type}`);
    }
    result.push({ ...lastState });
  }

  return result;
}

module.exports = transformStateWithClones;

// mentor solution;

// function addProperties(state, action) {
//   return {
//     ...state,
//     ...action.extraData,
//   };
// }

// function removeProperties(state, action) {
//   const newState = {
//     ...state,
//   };

//   for (let j = 0; j < action.keysToRemove.length; j++) {
//     const key = action.keysToRemove[j];

//     delete newState[key];
//   }

//   return newState;
// }

// function clear() {
//   return {};
// }

// const actionsByType = {
//   addProperties,
//   removeProperties,
//   clear,
// };

// /**
//  * @param {Object} state
//  * @param {Object} action
//  *
//  * @return {Object}
//  */
// function transformState(state, action) {
//   const transformer = actionsByType[action.type];

//   if (!transformer) {
//     throw new Error(`Unsupported action type: ${action.type}`);
//   }

//   return transformer(state, action);
// }

// /**
//  * @param {Object} state
//  * @param {Object[]} actions
//  *
//  * @return {Object[]}
//  */
// function transformStateWithClones(state, actions) {
//   const result = [];

//   for (let index = 0; index < actions.length; index++) {
//     const action = actions[index];
//     const lastState = result[index - 1] || state;
//     const newState = transformState(lastState, action);

//     result.push(newState);
//   }

//   return result;
// }

// module.exports = transformStateWithClones;
