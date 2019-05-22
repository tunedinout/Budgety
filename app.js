var UIController = (function() {
  var DOMStrings = {
    transactionTypeId: "#select-inc-exp",
    descriptionId: "#desc-inc-exp",
    amountId: "#amount-inc-exp",
    addButtonClass: ".add-btn",
    incomeListId: "#income-list",
    expenseListId: "#expense-list",
    totalIncomeId: "#income-amount",
    totalExpenseId: "#expense-amount",
    expensePercentageId: "#panel-expense-percentage",
    totalBudgetclass: ".amount",
    firstLineClass: ".info-text"
  };

  return {
    getInput: function() {
      return {
        type: document.getElementById(DOMStrings.transactionTypeId).value,
        description: document.getElementById(DOMStrings.descriptionId).value,
        amount: document.getElementById(DOMStrings.amountId).value
      };
    },

    addListItem: function(content, id) {
      var node = document.createElement("LI");
      node.setAttribute("id", id);
      var textNode = document.createTextNode(content);
      node.appendChild(textNode);
      node.classList.add("list-group-item list-no-border");
      document.getElementById(DOMStrings.incomeListId).appendChild(node);
    },

    removeListItem: function(id) {
      var node = document.getElementById(DOMStrings.incomeListId);
      if (budgetyController.getNumbersOfItemInListById(id) > 1)
        node.removeChild(id);
      else node.innerHTML = "";
    },
    setTotalIncome: function(totalIncome) {
      var node = document.getElementById(DOMStrings.totalIncomeId);
      node.textContent = "+ " + totalIncome;
    },
    setTotalExpense: function(totalExpense) {
      var node = document.getElementById(DOMStrings.totalExpenseId);
      node.textContent = "- " + totalExpense;
    },
    setExpensePercentage: function(percentage) {
      var node = document.getElementById(DOMStrings.expensePercentageId);
      node.textContent = percentage + "%";
    },
    setBudget: function(totalBudget) {
      var node = document.getElementById(DOMStrings.totalBudgetclass);
      node.textContent = totalBudget;
    },
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

var budgetyController = (function() {
  //var getNumbersOfItemInListById
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
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

  //helper functions
  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].array.forEach(element => {
      sum += element.value;
    });

    data.totals[type] = sum;
  };

  var findElementIndexById = function(type, id) {
    //element not found
    var index = -1;
    for (var i = 0; i < data.allItems[type].length; i++) {
      if (data.allItems[type][i].id === id) index = i;
    }
    return index;
  };

  return {
    addItem: function(type, desc, value) {
      //create new Id
      var id;
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
      } else newITem = new Expense(id, desc, value);

      data.allItems[type].push(newItem);
    },
    deleteItem: function(type, id) {
      for (var i = 0; i < data.allItems[type].length; i++) {
        element = data.allItems[type][i];
        if (element.id === id) {
          data.allItems[type].splice(i, 1);
          break;
        }
      }
    },
    calculateBudget: function() {
      var totalIncome = calculateTotal("inc");
      var totalExpense = calculateTotal("inc");
      var budget = totalIncome - totalExpense;
      data.budget = budget;
    },
    calculatePercentage: function() {},

    getBudget: function() {
      return data.budget;
    }
  };
})();

var appController = (function() {})();
