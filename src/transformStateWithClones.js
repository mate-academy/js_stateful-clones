'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = Object.assign({}, state);
  const history = [];
  const newOperations = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  for (const keys in transforms) {
    switch (transforms[keys].operation) {
      case newOperations.add:
        Object.assign(stateClone, transforms[keys].properties);
        break;
      case newOperations.clear:
        for (const keysForClear of Object.keys(stateClone)) {
          delete stateClone[keysForClear];
        }
        break;
      case newOperations.remove:
        for (const keysForRemove of transforms[keys].properties) {
          delete stateClone[keysForRemove];
        }
        break;
    }
    history.push(Object.assign({}, stateClone));
  }

  return history;
}
module.exports = transformStateWithClones;
