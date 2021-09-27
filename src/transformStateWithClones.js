'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
 function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateArray = [];

  for (const action of actions) {
    switch (true) {
      case (action.type === 'clear')
        : for (const clones in stateClone) {
          delete stateClone[clones];
        }
        stateArray.push({ ...stateClone });
        break;

      case (action.type === 'removeProperties')
        : for (const removals of action.keysToRemove) {
          delete stateClone[removals];
        }
        stateArray.push({ ...stateClone });
        break;

      case (action.type === 'addProperties')
        : for (const extras in action.extraData) {
          stateClone[extras] = action.extraData[extras];
        }
        stateArray.push({ ...stateClone });
        break;
    }
  }

  return stateArray;
}
module.exports = transformStateWithClones;
