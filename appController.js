var appController = (function() {
  var DOMstrings = UIController.getDOMStrings();

  var nodes = {
    onSubBtn: document.querySelector(DOMstrings.addButtonClass)
  };
  //console.log(DOMstrings);
  var setUpEventListeners = function() {
    nodes.onSubBtn.addEventListener("click", onTransactionSubmit);

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
        addedItem.type
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
