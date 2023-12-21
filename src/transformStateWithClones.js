'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   const array = [];
//   const cloneState = Object.assign({}, state);

//   for (const action of actions) {
//     if (action.type === 'addProperties') {
//       Object.assign(cloneState, action.extraData);
//     }

//     if (action.type === 'removeProperties') {
//       for (const key of action.keysToRemove) {
//         delete cloneState[key];
//       }
//     }

//     if (action.type === 'clear') {
//       for (const key in cloneState) {
//         delete cloneState[key];
//       }
//     }
//     array.push(Object.assign({}, cloneState));
//   }

//   return array;
// }

module.exports = transformStateWithClones;

function transformStateWithClones(state, actions) {
  const array = [];
  const cloneState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        };
        break;
      case 'clear': for (const key in cloneState) {
        delete cloneState[key];
      }
        break;
    }
    array.push(Object.assign({}, cloneState));
  }

  return array;
}

module.exports = transformStateWithClones;
