'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const { type } = actions[i];

    switch (type) {
      case 'addProperties':
        results.push(addProperties({ ...results[i] }, actions[i].extraData));
        break;

      case 'removeProperties':
        results.push(
          removeProperties({ ...results[i] }, actions[i].keysToRemove),
        );
        break;

      case 'clear':
        results.push(clearProperties({ ...results[i] }));
        break;
    }
  }
  results.shift();

  return results;
}

function addProperties(stateCopy, extraData) {
  return Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    if (key in stateCopy) {
      // Надійна перевірка наявності ключа
      delete stateCopy[key];
    }
  }

  return stateCopy;
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }

  return stateCopy;
}
module.exports = transformStateWithClones;
