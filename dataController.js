var dataController = (function() {
  //var getNumbersOfItemInListById
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else this.percentage = -1;
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  /**
   *
   * @param {"inc" or "exp"} type
   */
  var calculateTotal = function(type) {
    var sum = 0;
    for (var i = 0; i < data.allItems[type].length; i++) {
      sum += data.allItems[type][i].value;
    }
    data.totals[type] = sum;
    return sum;
  };

  return {
    init: function() {
      data.allItems.inc = [];
      data.allItems.exp = [];
      data.totals.inc = 0;
      data.totals.exp = 0;
      data.budget = 0;
      data.percentage = -1;
    },
    /**
     * @description calculates and stores all income and expense
     */
    calculateBudget: function() {
      data.budget = calculateTotal("inc") - calculateTotal("exp");

      for (var i = 0; i < data.allItems.exp.length; i++)
        data.allItems.exp[i].calcPercentage(data.totals.inc);

      var sumOfPercent = 0;
      for (var i = 0; i < data.allItems.exp.length; i++)
        sumOfPercent += data.allItems.exp[i].percentage;
      data.percentage = sumOfPercent;
      // console.log(typeof data.budget);
      // console.log(typeof data.allItems["inc"][0].value);
    },

    /**
     *
     * @param {string} type
     * @param {string} desc
     * @param {number} value
     */
    addItem: function(type, desc, value) {
      //create new Id
      var id;
      var percentage = -1;
      if (data.allItems[type].length > 0) {
        //get the id of the last element and increment by 1
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      var newItem;
      //create the relevant income or expense object
      if (type === "inc") {
        newItem = new Income(id, desc, value);
      } else newItem = new Expense(id, desc, value);

      data.allItems[type].push(newItem);

      return {
        id: id,
        type: type,
        description: desc,
        percentage: percentage,
        amount: value
      };
    },
    deleteItem: function(type, id) {
      for (var i = 0; i < data.allItems[type].length; i++) {
        el = data.allItems[type][i];
        if (el.id === id) {
          data.allItems[type].splice(i, 1);
          break;
        }
      }
      return {
        type: type,
        id: id
      };
    },

    getBudget: function() {
      return data.budget;
    },
    getTotals: function(type) {
      return data.totals[type];
    },
    getPercentage: function() {
      return data.percentage;
    },
    getDataObject: function() {
      return data;
    }
  };
})();
