/**
 * Node 20 compatibility polyfills for ECMAScript 2024 Set methods & Object.groupBy
 * Ensures seamless operation on Node 20 while GitHub Actions runs on Node 22.
 */
if (typeof Set !== 'undefined') {
  if (!Set.prototype.difference) {
    Set.prototype.difference = function (other) {
      const result = new Set(this);
      for (const elem of other) {
        result.delete(elem);
      }
      return result;
    };
  }

  if (!Set.prototype.intersection) {
    Set.prototype.intersection = function (other) {
      const result = new Set();
      for (const elem of other) {
        if (this.has(elem)) {
          result.add(elem);
        }
      }
      return result;
    };
  }

  if (!Set.prototype.union) {
    Set.prototype.union = function (other) {
      const result = new Set(this);
      for (const elem of other) {
        result.add(elem);
      }
      return result;
    };
  }

  if (!Set.prototype.symmetricDifference) {
    Set.prototype.symmetricDifference = function (other) {
      const result = new Set(this);
      for (const elem of other) {
        if (result.has(elem)) {
          result.delete(elem);
        } else {
          result.add(elem);
        }
      }
      return result;
    };
  }

  if (!Set.prototype.isSubsetOf) {
    Set.prototype.isSubsetOf = function (other) {
      for (const elem of this) {
        if (!other.has(elem)) return false;
      }
      return true;
    };
  }

  if (!Set.prototype.isSupersetOf) {
    Set.prototype.isSupersetOf = function (other) {
      for (const elem of other) {
        if (!this.has(elem)) return false;
      }
      return true;
    };
  }

  if (!Set.prototype.isDisjointFrom) {
    Set.prototype.isDisjointFrom = function (other) {
      for (const elem of this) {
        if (other.has(elem)) return false;
      }
      return true;
    };
  }
}

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
