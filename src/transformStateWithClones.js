'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const log = [];
  let logCopy = { ...state };

  for (const action in actions) {
    const action2 = actions[action];

    switch (action2.type) {
      case 'addProperties':

        logCopy = {
          ...logCopy, ...action2.extraData,
        };

        const addLog = { ...logCopy };

        log.push(addLog);
        break;

      case 'removeProperties':
        for (const key in action2.keysToRemove) {
          delete logCopy[action2.keysToRemove[key]];
        }

        const removeLog = { ...logCopy };

        log.push(removeLog);

        break;

      case 'clear':
        for (const key in logCopy) {
          delete logCopy[key];
        }

        const clearLog = { ...logCopy };

        log.push(clearLog);
        break;
    }
  }

  return log;
}

module.exports = transformStateWithClones;
