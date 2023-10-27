const chatboxElement = document.getElementById("chatbox");
const userInputElement = document.getElementById("userInput");
let medicineDatabase = null;

function loadMedicineDatabase(database) {
  medicineDatabase = database;
}

function initializeChatbot() {
  loadMedicineDatabase(medicine_database);
  // Perform any additional initialization steps here
  askForUserInput();
}

// Rest of the code...

function processUserInput() {
  const userInput = userInputElement.value.trim();
  userInputElement.value = "";
  displayUserMessage(userInput);

  if (isGreeting(userInput)) {
    displayMessage("Hello! How can I assist you today?", "bot");
    return;
  }

  if (!userInput.toLowerCase().startsWith("i have")) {
    displayMessage("I'm sorry, I didn't understand. Can you please rephrase your input?", "bot");
    return;
  }

  const symptoms = extractSymptoms(userInput);
  if (symptoms.length === 0) {
    displayMessage("Please specify the symptoms after 'I have'.", "bot");
    return;
  }

  // Prompt for user's age
  const userAge = prompt("How old are you?");
  if (userAge && parseInt(userAge) > 14) {
    loadMedicineDatabase(medicine_database);
  } else {
    loadMedicineDatabase(medicine_database_children);
  }

  const foundConditions = [];
  const unmatchedSymptoms = [];

  symptoms.forEach((symptom) => {
    const condition = findConditionBySymptom(symptom.trim());
    if (condition) {
      foundConditions.push(condition);
    } else {
      unmatchedSymptoms.push(symptom);
    }
  });

  if (foundConditions.length > 0) {
    displayConditions(foundConditions);
  } else {
    displayMessage(
      "Sorry, I couldn't find information for the following symptoms: " +
        unmatchedSymptoms.join(", "),
      "bot"
    );
  }
}

// Rest of the code...

function askForUserInput() {
  const userInputContainer = document.createElement("div");
  userInputContainer.classList.add("message", "userMessage");

  const userInputPrompt = document.createElement("p");
  userInputPrompt.textContent = "Your response:";
  userInputContainer.appendChild(userInputPrompt);

  const userInputField = document.createElement("input");
  userInputField.type = "text";
  userInputField.id = "userInput";
  userInputContainer.appendChild(userInputField);

  const userInputSubmit = document.createElement("button");
  userInputSubmit.textContent = "Submit";
  userInputSubmit.addEventListener("click", processUserInput);
  userInputContainer.appendChild(userInputSubmit);

  chatboxElement.appendChild(userInputContainer);
  userInputField.focus();
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  if (sender === "bot") {
    messageElement.classList.add("message", "botMessage");
    askForUserInput();
  } else if (sender === "user") {
    messageElement.classList.add("message", "userMessage");
  }

  chatboxElement.appendChild(messageElement);
  chatboxElement.scrollTop = chatboxElement.scrollHeight;
}

// Rest of the code...

initializeChatbot();