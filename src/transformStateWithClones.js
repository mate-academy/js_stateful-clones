'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const history = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        addProperties(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, obj.keysToRemove);
        break;
      case 'clear':
        clearObject(stateCopy);
        break;
    }
  }

  function addProperties(object, extraData) {
    const copy = { ...object };

    Object.assign(copy, extraData);

    stateCopy = copy;

    history.push(stateCopy);
  }

  function removeProperties(object, keysToRemove) {
    const copy = { ...object };

    for (const key of keysToRemove) {
      delete copy[key];
    }

    stateCopy = copy;

    history.push(stateCopy);
  }

  function clearObject(object) {
    const copy = { ...object };

    for (const key in object) {
      delete copy[key];
    }

    stateCopy = copy;

    history.push(stateCopy);
  }

  return history;
}

module.exports = transformStateWithClones;
