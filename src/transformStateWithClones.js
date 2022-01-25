'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }

        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }

        break;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;

// if (actions[i].type === 'addProperties') {
//   for (const addKey in actions[i].extraData) {
//     if (!state[addKey] || state[addKey] !== actions[i].extraData[addKey]) {
//       state[addKey] = actions[i].extraData[addKey];
//     }
//   }
// } else if (actions[i].type === 'removeProperties') {
//   for (let del = 0; del < actions[i].keysToRemove.length; del++) {
//     if (state[actions[i].keysToRemove[del]]) {
//       delete state[actions[i].keysToRemove[del]];
//     }
//   }
// } else if (actions[i].type === 'clear') {
//   for (const key in state) {
//     delete state[key];
//   }
// }
