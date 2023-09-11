'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const stateClone = { ...state };
  // i like my way
  // for (let i = 0; i < actions.length; i++) {
  //   if (actions[i].type === 'addProperties') {
  //     Object.assign(stateClone, actions[i].extraData);
  //     clones[i] = Object.assign({}, stateClone);
  //   } else if (actions[i].type === 'removeProperties') {
  //     for (let j = 0; j < actions[i].keysToRemove.length; j++) {
  //       const keyToRemove = actions[i].keysToRemove[j];

  //       delete stateClone[keyToRemove];
  //     }
  //     clones[i] = Object.assign({}, stateClone);
  //   } else if (actions[i].type === 'clear') {
  //     for (const k in stateClone) {
  //       delete stateClone[k];
  //     }
  //     clones[i] = Object.assign({}, stateClone);
  //   };
  // }
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        clones.push(Object.assign({}, stateClone));
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        clones.push(Object.assign({}, stateClone));
        break;
      }

      case 'clear': {
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }
        clones.push(Object.assign({}, stateClone));
        break;
      }
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
