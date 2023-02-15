/** Navbar Header **/
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/** DOM Elements **/
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const textControl = document.querySelectorAll(".text-control");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxGtu = document.getElementById("checkbox1");
const checkboxEmpty = document.getElementById("checkbox-empty");
const cities = document.querySelectorAll(".radio-input");
const errorEmptyField = document.getElementById("errorEmptyField");
const validationModal = document.querySelector(".validation-modal");
const form = document.querySelector("form");
const modalBody = document.querySelector(".modal-body");
const validClose = document.getElementById("validation-close");
const modalSubmitBtn = document.querySelector(".btn-submit");

/** launch modal **/
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
  })
);

/** close modal **/
modalCloseBtn[0].addEventListener("click", () => {
  modalbg.style.display = "none";
});

/** Error count Object
 *
 * > Sum of errors in a function
 **/
const errorSums = {
  "errorFirst": 0,
  "errorLast": 0,
  "errorMail": 0,
  "errorBirth": 0,
  "errorParticipations": 0,
  "errorCities": 0,
  "errorCheck": 0
}

/** Error messages Object **/
const errors = {
  invalidFirst: "Le prénom ne doit comporter que des lettres ou des tirets.",
  minFirstLetters: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  invalidLast: "Le nom ne doit comporter que des lettres ou des tirets.",
  minLastLetters: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  invalidMail: "L'adresse email n'est pas valide.",
  invalidDate: "La date de naissance renseignée n'est pas valide (age minimum : 14 ans).",
  invalidQuantity: "Veuillez renseigner votre nombre de participation.",
  invalidCity: "Vous devez choisir une ville.",
  invalidGtu: "<br>Vous devez acceptez les termes et conditions pour participer.",
};

/** Regex Object **/
const rules = {
  birthdate: (v) => /^((19[3-9]+[0-9]|200[0-9])-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])|(0?[1-9]|[12]\d|3[01])[/](0?[1-9]|1[0-2])[/](19[3-9]+[0-9]|200[0-6]))$/.test(v),
  name: (v) => /^[a-zA-Z\-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ]{1,}$/.test(v),
  mail: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
  minChart: (v) => v && v.length >= 2,
  quantity: (v) => /^[0-9]*$/.test(v)
};

/** Inputs Object to check instantly when writting in the field **/
const inputs = [
  { elementId: "first", checkFunction: checkFirstname },
  { elementId: "last", checkFunction: checkLastname },
  { elementId: "email", checkFunction: checkMail },
  { elementId: "birthdate", checkFunction: checkBirthdate },
  { elementId: "quantity", checkFunction: checkParticipations }
]

/** methods to check instantly when writting in the field **/
inputs.forEach((input) => {
  const element = document.getElementById(input.elementId);
  element.oninput = () => {
    input.checkFunction();
  };

  element.addEventListener("focusout", () => {
    input.checkFunction();
  });
});

/** Global function to use for the checking conditions
 *
 * errorType = HTML tag where the error will be display
 * textContent = content to display at the HTML tag
 * classType = input where the CSS will be add
 * className = CSS class(es) to add
 * errorCount = name of the errorCount of the function
 * error = number (1 = error ; 0 = no error)
 */
function checking(errorType, textContent, classType, className, errorCount, error) {
  errorType.textContent = textContent;
  classType.className = className;
  errorSums[errorCount] = error;
}

/**  Checking firstname input **/
function checkFirstname() {
  const errorFirstName = document.getElementById("errorFirstName");
  if (!rules.name(first.value) && !!first.value) {
    checking(errorFirstName, errors.invalidFirst, first, "text-control error-border", "errorFirst", 1);
  } else if (!rules.minChart(first.value)) {
    checking(errorFirstName, errors.minFirstLetters, first, "text-control error-border", "errorFirst", 1);
  } else {
    checking(errorFirstName, "", first, "text-control", "errorFirst", 0);
  }
};

/** Checking Lastname input **/
function checkLastname() {
  const errorLastName = document.getElementById("errorLastName");
  if (!rules.name(last.value) && !!last.value) {
    checking(errorLastName, errors.invalidLast, last, "text-control error-border", "errorLast", 1);
  } else if (!rules.minChart(last.value)) {
    checking(errorLastName, errors.minLastLetters, last, "text-control error-border", "errorLast", 1);
  } else {
    checking(errorLastName, "", last, "text-control", "errorLast", 0);
  }
};

/**  Checking Email input **/
function checkMail() {
  const errorEmail = document.getElementById("errorEmail");
  if (!rules.mail(email.value) || !email.value) {
    checking(errorEmail, errors.invalidMail, email, "text-control error-border", "errorMail", 1);
  } else {
    checking(errorEmail, "", email, "text-control", "errorMail", 0);
  }
};

/** Checking birthdate input */
function checkBirthdate() {
  const errorBirthdate = document.getElementById("errorBirthdate");
  if (!rules.birthdate(birthdate.value)) {
    checking(errorBirthdate, errors.invalidDate, birthdate, "text-control error-border", "errorBirth", 1);
  } else {
    checking(errorBirthdate, "", birthdate, "text-control", "errorBirth", 0);
  }
};

/** Checking number of participations input **/
function checkParticipations() {
  if (!rules.quantity(quantity.value) || !quantity.value) {
    checking(errorQuantity, errors.invalidQuantity, quantity, "text-control error-border", "errorParticipations", 1);
  } else {
    checking(errorQuantity, "", quantity, "text-control", "errorParticipations", 0);
  }
};

/** Checking city input **/
const errorCity = document.getElementById("errorCity");
function checkCity() {
  let valid = false;
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].checked) {
      valid = true;
    }
  }

  if (valid) {
    errorCity.textContent = "";
    errorSums["errorCities"] = 0;
  } else {
    errorCity.textContent = errors.invalidCity;
    errorSums["errorCities"] = 1;
  }
};

/** methods to check instantly when clicking on a radio button **/
cities.forEach((btn) =>
  btn.addEventListener("change", () => {
    const checkedButtons = document.querySelector("input[name='location']:checked");
    this.checkedButtons !== null ? (errorCity.textContent = "") : (errorCity.textContent = errors.invalidCity);
  })
);

/** Checking checkbox GTU input **/
function checkGtu() {
  if (checkboxGtu.checked === false) {
    checkboxEmpty.innerHTML = errors.invalidGtu;
    errorSums["errorCheck"] = 1;
  } else {
    checkboxEmpty.textContent = "";
    errorSums["errorCheck"] = 0;
  }
};

/** methods to check instantly when clicking on the checkbox **/
checkboxGtu.addEventListener("change", function () {
  this.checked ? (checkboxEmpty.textContent = "") : (checkboxEmpty.innerHTML = errors.invalidGtu);
});

/** Checking that there is no errors detected **/
modalSubmitBtn.addEventListener("click", (e) => {
  /** checking each function */
  inputs.forEach((input) => {
    input.checkFunction();
  })
  checkCity();
  checkGtu();
  e.preventDefault();
  /** sum all the errorSum results (valid if strictly equal to 0) */
  if (Object.values(errorSums).reduce((accumulator, value) => { return accumulator + value; }) === 0) {
    form.style.display = "none";
    validationModal.className = "validation-block";
    modalBody.classList.add("validation");
  }
});

/** Submitting form **/
document.querySelector(".btn-close-form").addEventListener("click", () => {
  form.submit();
});
