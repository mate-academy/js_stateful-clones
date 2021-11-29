'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let newObject1 = Object.assign({}, state);

  for (let i = 0; i < actions.length; ++i) {
    const newObj = Object.assign({}, newObject1);

    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        newObj[key] = actions[i].extraData[key];
      }
      states.push(newObj);
      newObject1 = newObj;
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; ++j) {
        delete newObj[actions[i].keysToRemove[j]];
      }
      states.push(newObj);
      newObject1 = newObj;
    } else {
      for (const k in newObj) {
        delete newObj[k];
      }
      states.push(newObj);
      newObject1 = newObj;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
