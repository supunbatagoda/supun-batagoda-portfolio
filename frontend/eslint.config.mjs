/* eslint-disable import/first */
if (!Object.groupBy) {
  Object.groupBy = function (items, callback) {
    return items.reduce((acc, item, index) => {
      const key = callback(item, index);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };
}

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt();
