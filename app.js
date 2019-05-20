var UIController = (function() {
  var DOMStrings = {
    transactionTypeId: "#select-inc-exp",
    descriptionId: "#desc-inc-exp",
    amountId: "#amount-inc-exp",
    addButtonClass: ".add-btn",
    incomeListId: "#income-list",
    expenseListId: "#expense-list"
  };
  return {
    getInput: function() {
      return {
        type: document.getElementById(DOMStrings.transactionTypeId).value,
        descripiton: document.getElementById(DOMStrings.descriptionId).value,
        amount: document.getElementById(DOMStrings.amountId).value
      };
    },

    addListItem: function(content) {
      var node = document.createElement("LI");
      var textNode = document.createTextNode(content);
      node.appendChild(textNode);
      node.classList("list-group-item list-no-border");
      document.getElementById(DOMStrings.incomeListId).appendChild(node);
    }
  };
})();
