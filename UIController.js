var UIController = (function() {
  var DOMstrings = {
    monthOfyearId: "info-text-line",
    totalBudgetId: "info-text-amount",
    transactionTypeId: "select-element",
    descriptionId: "desc-inc-exp",
    amountId: "amount-inc-exp",
    addButtonClass: ".add-btn",
    incomeListId: "income-list",
    expenseListId: "expense-list",
    totalIncomeId: "panel-income-amount",
    totalExpenseId: "panel-expense-amount",
    expensePercentageId: "panel-expense-percentage",
    listIncDescClass: "list-inc-description",
    listIncAmntClass: "list-inc-amount",
    listIncBtnClass: "clear-inc-btn",
    listExpDescClass: "list-exp-description",
    listExpAmntClass: "list-exp-amount",
    listExpBtnClass: "clear-exp-btn",
    listExpPerClass: "list-exp-percentage",
    listItemClasses: ["list-group-item", "list-no-border"],
    buttonIconHtml: '<i class="icon ion-close-circled"></i>'
  };

  //amount string always with a sign like '+ 799'
  //minimum length of amount string is
  var getRupeeSignHTMLAndText = function(amountString, fontSize) {
    /**
     * amount string is of minum length three '+ 5' or '- 5'
     */
    var font_size = fontSize === undefined ? "30px" : fontSize;

    var rupeeSignHtml = "<span >&#8377;</span>";
    var finalText =
      amountString.slice(0, 2) + rupeeSignHtml + amountString.slice(2);
    return finalText;
  };

  var nodes = (function() {
    return {
      budget: document.getElementById(DOMstrings.totalBudgetId),
      totalInc: document.getElementById(DOMstrings.totalIncomeId),
      totalExp: document.getElementById(DOMstrings.totalExpenseId),
      totalPer: document.getElementById(DOMstrings.expensePercentageId),
      expList: document.getElementById(DOMstrings.expenseListId),
      incList: document.getElementById(DOMstrings.incomeListId),
      descInput: document.getElementById(DOMstrings.descriptionId),
      amtInput: document.getElementById(DOMstrings.amountId),
      selInput: document.getElementById(DOMstrings.transactionTypeId),
      expListPrefix: "exp-",
      incListPrefix: "inc-"
    };
  })();

  return {
    /**
     * @param
     * @returns
     *
     */
    displayMonthYear: function() {
      var dateNode = document.getElementById(DOMstrings.monthOfyearId);

      //date
      var date = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var month = date.getMonth();
      var year = date.getFullYear();

      dateNode.textContent =
        "Available budget in " + months[month] + " " + year;
    },
    displaybudget: function(dataObject) {
      var totalIncome, totalBudget, totalExpense, percentage;
      totalIncome = "+ " + dataObject.totals.inc;
      totalExpense = "- " + dataObject.totals.exp;

      if (dataObject.budget === 0) {
        totalBudget = "+ 0000.00";
      } else {
        totalBudget =
          dataObject.budget > 0
            ? "+ " + dataObject.budget
            : "- " + dataObject.budget;
      }

      if (dataObject.percentage === -1) {
        percentage = "---";
      } else {
        percentage = "-" + dataObject.percentage + "%";
      }

      this.displayMonthYear();

      nodes.budget.innerHTML = getRupeeSignHTMLAndText(totalBudget);
      nodes.totalInc.innerHTML = getRupeeSignHTMLAndText(totalIncome);
      nodes.totalExp.innerHTML = getRupeeSignHTMLAndText(totalExpense);
      nodes.totalPer.textContent = percentage;

      //re-evalute exp percentage
      console.log(dataObject);
      for (var id = 0; id < dataObject.allItems.exp.length; id++) {
        var percentElement = document.getElementById(
          DOMstrings.listExpPerClass + "-" + id
        );
        percentElement.textContent =
          "- " + dataObject.allItems.exp[id].percentage;
      }
    },
    getInput: function() {
      var el = document.getElementById(DOMstrings.transactionTypeId);
      var typeText = el.options[el.selectedIndex].value;
      return {
        type: typeText,
        description: document.getElementById(DOMstrings.descriptionId).value,
        amount: parseInt(document.getElementById(DOMstrings.amountId).value, 10)
      };
    },
    /**
     *
     * @param {string} id
     * @param {string} description
     * @param {string} amount
     * @param {string} percentage
     * @param {string} type
     */

    addListItem: function(
      id,
      description,
      amount,
      percentage,
      type,
      clickFunction
    ) {
      //set the proper format of the amount in rupees

      var listEl = document.createElement("LI");
      var descEl = document.createElement("DIV");
      var amtEl = document.createElement("DIV");
      var perEl = document.createElement("DIV");
      var btnEl = document.createElement("BUTTON");

      for (var i = 0; i < DOMstrings.listItemClasses.length; i++)
        listEl.classList.add(DOMstrings.listItemClasses[i]);

      if (type === "exp") {
        amount = "- " + amount;
        listEl.setAttribute("id", nodes.expListPrefix + id);
        descEl.setAttribute("id", DOMstrings.listExpDescClass + "-" + id);
        amtEl.setAttribute("id", DOMstrings.listExpAmntClass + "-" + id);
        btnEl.setAttribute("id", DOMstrings.listExpBtnClass + "-" + id);
        perEl.setAttribute("id", DOMstrings.listExpPerClass + "-" + id);

        descEl.classList.add(DOMstrings.listExpDescClass);
        amtEl.classList.add(DOMstrings.listExpAmntClass);
        btnEl.classList.add(DOMstrings.listExpBtnClass);
        perEl.classList.add(DOMstrings.listExpPerClass);
      } else {
        amount = "+ " + amount;
        listEl.setAttribute("id", nodes.incListPrefix + id);
        descEl.setAttribute("id", DOMstrings.listIncDescClass + "-" + id);
        amtEl.setAttribute("id", DOMstrings.listIncAmntClass + "-" + id);
        btnEl.setAttribute("id", DOMstrings.listIncBtnClass + "-" + id);

        descEl.classList.add(DOMstrings.listIncDescClass);
        amtEl.classList.add(DOMstrings.listIncAmntClass);
        btnEl.classList.add(DOMstrings.listIncBtnClass);
      }

      btnEl.innerHTML = DOMstrings.buttonIconHtml;

      descEl.textContent = description;

      amtEl.innerHTML = getRupeeSignHTMLAndText(amount);
      console.log(percentage + "%");

      perEl.textContent = percentage;

      listEl.appendChild(descEl);
      listEl.appendChild(amtEl);
      if (type === "exp") listEl.appendChild(perEl);
      listEl.appendChild(btnEl);

      if (type === "inc") {
        nodes.incList.appendChild(listEl);
      } else {
        nodes.expList.appendChild(listEl);
      }

      //make the button element appear on hover
      btnEl.style.visibility = "hidden";

      listEl.addEventListener("mouseover", function() {
        btnEl.style.visibility = "visible";

        amtEl.style.transform = "translateX(-20%)";
        perEl.style.transform = "translateX(-70%)";
      });
      listEl.addEventListener("mouseout", function() {
        btnEl.style.visibility = "hidden";
        amtEl.style.transform = "translateX(0%)";
        perEl.style.transform = "translateX(0%)";
      });

      btnEl.addEventListener("click", clickFunction);
    },
    /**
     *
     * @param {string} id
     * @param {string} type
     */
    clearItem: function(id, type) {
      var node;
      if (type === "inc") {
        node = nodes.incList;
      } else {
        node = nodes.expList;
      }
      node.removeChild(id);
    },

    clearInputFields: function() {
      nodes.descInput.value = "";
      nodes.amtInput.value = "";
    },

    getDOMStrings: function() {
      return DOMstrings;
    },

    init: function() {
      this.displayMonthYear();
      this.displaybudget({
        allItems: {
          inc: [],
          exp: []
        },
        totals: {
          inc: 0,
          exp: 0
        },
        budget: 0,
        percentage: -1
      });
      //clear the lists
      //childNodes array  always contains all  the new line characters
      //console.log(nodes.incList.childNodes);
      var incListHead = nodes.incList.childNodes[1];
      nodes.incList.innerHTML = "";
      nodes.incList.appendChild(incListHead);

      var expListHead = nodes.expList.childNodes[1];
      nodes.expList.innerHTML = "";
      nodes.expList.appendChild(expListHead);
      nodes.selInput.value = "";
      nodes.descInput.value = "";
    }
  };
})();
