var appController = (function() {
  var DOMstrings = UIController.getDOMStrings();
  console.log(DOMstrings);
  var nodes = {
    onSubBtn: document.querySelector(DOMstrings.addButtonClass),
    onClearInc: document.querySelector("." + DOMstrings.listIncBtnClass),
    onClearExp: document.querySelector("." + DOMstrings.listExpBtnClass),
    incList: document.getElementById(DOMstrings.incomeListId),
    expList: document.getElementById(DOMstrings.expenseListId)
  };
  //console.log(DOMstrings);
  var setUpEventListeners = function() {
    nodes.onSubBtn.addEventListener("click", onTransactionSubmit);
    //HOW TO PASS ARGUMENTS TO CALL BACK FUNCTION ?
    function clearItem() {
      //     var classType = this.getAttribute("class") + "";
      //    console.log(class.substring("inc"));
      var type = this.getAttribute("class").search("inc") > 0 ? "inc" : "exp";
      var child = document.getElementById(
        type + "-" + this.id[this.id.length - 1]
      );
      nodes[type + "List"].removeChild(child);

      dataController.deleteItem(type, this.id[this.id.length - 1]);
      dataController.calculateBudget();
      UIController.displaybudget(dataController.getDataObject());
    }

    function onTransactionSubmit() {
      var input = UIController.getInput();
      // console.log(input);

      //all fields are mandatory
      if (
        !(
          (input.type || input.type === "Type" || input.type === "") &&
          input.amount &&
          input.description
        )
      )
        return;

      var type = input.type === "+" ? "inc" : "exp";
      //console.log(type, input.description, input.amount);
      var addedItem = dataController.addItem(
        type,
        input.description,
        input.amount
      );
      dataController.calculateBudget();
      // console.log(addedItem);
      //console.log(dataController.getDataObject());

      UIController.addListItem(
        addedItem.id,
        addedItem.description,
        addedItem.amount,
        addedItem.percentage,
        addedItem.type,
        clearItem
      );

      UIController.displayMonthYear();
      UIController.displaybudget(dataController.getDataObject());
      UIController.clearInputFields();
      //console.log(dataController.getDataObject());
    }
  };

  return {
    init: function() {
      //update the first line
      UIController.init();
      dataController.init();
      // console.log("init happened");
      setUpEventListeners();
    }
  };
})();
appController.init();
// appController.setUpEventListeners();
