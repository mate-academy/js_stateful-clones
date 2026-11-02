/**
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let stateCopy = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...act.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          const { [key]: removed, ...rest } = stateCopy;

          stateCopy = rest;
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    res.push({ ...stateCopy });
  }

  return res;
}

module.exports = transformStateWithClones;
