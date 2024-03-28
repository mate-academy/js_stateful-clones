'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let obj = Object.assign({}, state);

  function pushClonedObject() {
    res.push({ ...obj });
  }

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        obj = { ...obj, ...extraData };
        pushClonedObject();
        break;

      case 'removeProperties':
        for (const removeElement of keysToRemove) {
          delete obj[removeElement];
        }
        pushClonedObject();
        break;

      case 'clear':
        obj = {};
        pushClonedObject();
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
