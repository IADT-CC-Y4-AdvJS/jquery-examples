$(document).ready(function () {

  function checkEmail() {
    let emailField = $("#email")[0];
    let emailError = $("#email + span.error")[0];
    if (!emailField.validity.valid) {
      if (emailField.validity.valueMissing) {
        emailError.textContent = 'You need to enter an e-mail address.';
      }
      else if (emailField.validity.typeMismatch) {
        emailError.textContent = 'Entered value needs to be an e-mail address.';
      }
      else if (emailField.validity.tooShort) {
        emailError.textContent = `Email should be at least ${ emailField.minLength } characters; you entered ${ emailField.value.length }.`;
      }
      else if (emailField.validity.tooLong) {
        emailError.textContent = `Email should be at most ${ emailField.maxLength } characters; you entered ${ emailField.value.length }.`;
      }
    }
    else {
      emailError.textContent = "";
    }
  }

  function checkPassword() {
    let passwordField = $("#password")[0];
    let passwordError = $("#password + span.error")[0];
    if (!passwordField.validity.valid) {
      if (passwordField.validity.valueMissing) {
        passwordError.textContent = 'You need to enter a password address.';
      }
      else if (passwordField.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${ passwordField.minLength } characters; you entered ${ passwordField.value.length }.`;
      }
      else if (passwordField.validity.tooLong) {
        passwordError.textContent = `Password should be at most ${ passwordField.maxLength } characters; you entered ${ passwordField.value.length }.`;
      }
    }
    else {
      passwordError.textContent = "";
    }
  }

  function checkName() {
    let nameField = $("#name")[0];
    let nameError = $("#name + span.error")[0];
    if (!nameField.validity.valid) {
      if (nameField.validity.tooLong) {
        nameError.textContent = `Name should be at most ${ nameField.maxLength } characters; you entered ${ nameField.value.length }.`;
      }
    }
    else {
      nameError.textContent = "";
    }
  }

  function checkDOB() {
    let dobField = $("#dob")[0];
    let dobError = $("#dob + span.error")[0];
    if (!dobField.validity.valid) {
      if (dobField.validity.typeMismatch) {
        dobError.textContent = "Entered value does not conform to the required format, 'yyyy-MM-dd'";
      }
    }
    else {
      let date = Date.parse(dobField.value);
      let today = new Date();
      if (date > today) {
        let message = "Entered value must be before today."
        dobError.textContent = message;
        dobField.setCustomValidity(message);
      }
      else {
        dobError.textContent = "";
        dobField.setCustomValidity("");
      }
    }
  }

  function checkHeight() {
    let heightField = $("#height")[0];
    let heightError = $("#height + span.error")[0];
    if (!heightField.validity.valid) {
      if (heightField.validity.rangeUnderflow) {
        heightError.textContent = `Height should be at least ${ heightField.min }; you entered ${ heightField.value }.`;
      }
      else if (heightField.validity.rangeOverflow) {
        heightError.textContent = `Height should be at most ${ heightField.max }; you entered ${ heightField.value }.`;
      }
      else if (heightField.validity.stepMismatch) {
        let numDigits = heightField.value.length - heightField.value.indexOf(".") - 1;
        heightError.textContent = `Height should have no more than 2 digits after the decimal point; you entered ${ numDigits }.`;
      }
    }
    else {
      heightError.textContent = "";
    }
  }

  function checkLanguages() {
    let languages = $("input[name*=languages]:checked");
    let languagesError = $("#languages + span.error")[0];
    if (languages.length == 0) {
      languagesError.textContent = "You must select at least one language.";
    }
    else {
      languagesError.textContent = "";
    }
  }

  function checkProfile() {
    let profileField = $("#profile")[0];
    let profileError = $("#profile + span.error")[0];
    let files = profileField.files;

    if (files.length > 0) {
      let file = files[0];
      let fileType = file.type.toLowerCase();
      let allowedFileTypes = ["image/png", "image/jpeg"];
      if (!allowedFileTypes.includes(fileType)) {
        let message = "The selected file must not be a JPEG or PNG file.";
        profileError.textContent = message;
        profileField.setCustomValidity(message);
      }
      else if (file.size > 75 * 1024) {
        let message = "The selected file must not be larger than 75 kB";
        profileError.textContent = message;
        profileField.setCustomValidity(message);
      }
      else {
        profileError.textContent = "";
        profile.setCustomValidity("");
      }
    }
    else {
      profileError.textContent = "";
      profile.setCustomValidity("");
    }
  }

  function checkAddress() {
    let addressField = $("#address")[0];
    let addressError = $("#address + span.error")[0];
    if (!addressField.validity.valid) {
      if (addressField.validity.tooShort) {
        addressError.textContent = `Address should be at least ${ addressField.minLength } characters; you entered ${ addressField.value.length }.`;
      }
      else if (addressField.validity.tooLong) {
        addressError.textContent = `Address should be at most ${ addressField.maxLength } characters; you entered ${ addressField.value.length }.`;
      }
    }
    else {
      addressError.textContent = "";
    }
  }

  function checkPostCode() {
    let constraints = {
      "ie" : {
        "regexp" : '^([ac-fhknprtv-yAC-FHKNPRTV-Y]\d{2}|D6W)\s*[0-9ac-fhknprtv-yAC-FHKNPRTV-Y]{4}',
        "message": 'Please re-check your Eircode or find your correct Eircode <a href="https://finder.eircode.ie/#/" target="_blank">here</a>'
      },
      "uk" : {
        "regexp" : '^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$',
        "message": 'Please re-check your post code or find your correct post code <a href="https://www.royalmail.com/find-a-postcode" target="_blank">here</a>'
      },
      "es" : {
        "regexp" : '^(ES-)?\\d{5}$',
        "message": 'Spanish post codes must have exactly 5 digits: e.g. ES-29780 or 29780'
      },
      "fr" : {
        "regexp" : '^(F-)?\\d{5}$',
        "message": 'French post codes must have exactly 5 digits: e.g. F-75012 or 75012'
      },
      "de" : {
        "regexp" : '^(D-)?\\d{5}$',
        "message": 'German post codes must have exactly 5 digits: e.g. D-12345 or 12345'
      },
      "nl" : {
        "regexp" : '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])',
        "message": 'Dutch post codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS'
      }
    };

    let country = $("#country").val();
    let postcodeField = $("#postcode")[0];
    let postcodeError = $("#postcode + span.error")[0];
    let postcode = postcodeField.value;
    let constraint = new RegExp(constraints[country].regexp, "");
    if (postcode.length > 0 && !constraint.test(postcode)) {
      postcodeError.innerHTML = constraints[country].message;
      postcodeField.setCustomValidity(postcodeError.innerHTML);
    }
    else {
      postcodeError.innerHTML = "";
      postcodeField.setCustomValidity("");
    }
  }

  function checkPhone() {
    let phoneField = $("#phone")[0];
    let phoneError = $("#phone + span.error")[0];
    if (!phoneField.validity.valid) {
      if (phoneField.validity.tooShort) {
        phoneError.textContent = `Phone should be at least ${ phoneField.minLength } characters; you entered ${ phoneField.value.length }.`;
      }
      else if (addressField.validity.tooLong) {
        phoneError.textContent = `Phone should be at most ${ phoneField.maxLength } characters; you entered ${ phoneField.value.length }.`;
      }
    }
    else {
      phoneError.textContent = "";
    }
  }

  function checkWebsite() {
    let websiteField = $("#website")[0];
    let websiteError = $("#website + span.error")[0];
    if (!websiteField.validity.valid) {
      if (websiteField.validity.typeMismatch) {
        websiteError.textContent = 'Entered value needs to be a valid URL address.';
      }
      else if (websiteField.validity.tooLong) {
        websiteError.textContent = `Website should be at most ${ websiteField.maxLength } characters; you entered ${ websiteField.value.length }.`;
      }
    }
    else {
      websiteError.textContent = "";
    }
  }

  function checkCardType() {
    checkCardNumber();
    checkCardSecurity();
  }

  function checkCardNumber() {
    let constraints = {
      "visa" : {
        "regexp" : '^4[0-9]{12}(?:[0-9]{3})?$',
        "message": 'All Visa card numbers start with a 4. New cards have 16 digits; old cards have 13 digits. Please check your VISA card number.'
      },
      "mastercard" : {
        "regexp" : '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$',
        "message": 'MasterCard numbers either start with 51-55 or 2221-2720. All have 16 digits. Please check your MasterCard card number.'
      },
      "amex" : {
        "regexp" : '^3[47][0-9]{13}$',
        "message": 'American Express card numbers start with 34 or 37 and have 15 digits. Please check your American Express card number.'
      }
    };

    let cardNumberField = $("#card_number")[0];
    let cardNumberError = $("#card_number + span.error")[0];
    let cardNumber = cardNumberField.value;
    if (cardNumber.length > 0) {
      let checkedCards = $("input[name=card_type]:checked");
      if (checkedCards.length === 1) {
        let cardTypeField = $("input[name=card_type]:checked")[0];
        let cardType = cardTypeField.value;
        let constraint = new RegExp(constraints[cardType].regexp, "");
        if (!constraint.test(cardNumber)) {
          let message = constraints[cardType].message;
          cardNumberError.textContent = message;
          cardNumberField.setCustomValidity(message);
        }
        else {
          cardNumberError.textContent = "";
          cardNumberField.setCustomValidity("");
        }
      }
      else {
        let message = "Select a card type to validate your card number.";
        cardNumberError.textContent = message;
        cardNumberField.setCustomValidity(message);
      }
    }
  }

  function checkCardExpiry() {
    let cardExpiryField = $("#card_expiry")[0];
    let cardExpiryError = $("#card_expiry + span.error")[0];
    if (!cardExpiryField.validity.valid) {
      if (cardExpiryField.validity.patternMismatch) {
        cardExpiryError.textContent = `Card Expiry should be two digits, a forward slash /, and two digits.`;
      }
    }
    else {
      cardExpiryError.textContent = "";
    }
  }

  function checkCardSecurity() {
    let constraints = {
      "visa" : {
        "regexp" : '^[0-9]{3}$',
        "message": 'The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.'
      },
      "mastercard" : {
        "regexp" : '^[0-9]{3}$',
        "message": 'The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.'
      },
      "amex" : {
        "regexp" : '^[0-9]{4}$',
        "message": 'The CVV code for your card should have exactly 4 digits and nothing else. Please check your CVV code.'
      }
    };

    let cardSecurityField = $("#card_security")[0];
    let cardSecurityError = $("#card_security + span.error")[0];
    let cardSecurity = cardSecurityField.value;
    if (cardSecurity.length > 0) {
      let checkedCards = $("input[name=card_type]:checked");
      if (checkedCards.length === 1) {
        let cardTypeField = $("input[name=card_type]:checked")[0];
        let cardType = cardTypeField.value;
        let constraint = new RegExp(constraints[cardType].regexp, "");
        if (!constraint.test(cardSecurity)) {
          let message = constraints[cardType].message;
          cardSecurityError.textContent = message;
          cardSecurityField.setCustomValidity(message);
        }
        else {
          cardSecurityError.textContent = "";
          cardSecurityField.setCustomValidity("");
        }
      }

      else {
        let message = "Select a card type to validate your card number.";
        cardSecurityError.textContent = message;
        cardSecurityField.setCustomValidity(message);
      }
    }
  }

  function checkCardName() {
    let cardNameField = $("#card_name")[0];
    let cardNameError = $("#card_name + span.error")[0];
    if (!cardNameField.validity.valid) {
      if (cardNameField.validity.tooLong) {
        cardNameError.textContent = `Card name should be at most ${ cardNameField.maxLength } characters; you entered ${ cardNameField.value.length }.`;
      }
    }
    else {
      cardNameError.textContent = "";
    }
  }

  $("input#email").on("blur", checkEmail);
  $("input#password").on("blur", checkPassword);
  $("input#name").on("blur", checkName);
  $("input#dob").on("change", checkDOB);
  $("input#height").on("blur", checkHeight);
  $("input[name*=languages]").on("change", checkLanguages);
  $("#profile").on("change", checkProfile);
  $("#address").on("blur", checkAddress);
  $("#country").on("change", checkPostCode);
  $("input#postcode").on("blur", checkPostCode);
  $("#phone").on("blur", checkPhone);
  $("#website").on("blur", checkWebsite);
  $("input[name=card_type]").on("change", checkCardType);
  $("input#card_number").on("blur", checkCardNumber);
  $("input#card_security").on("blur", checkCardSecurity);
  $("input#card_name").on("blur", checkCardName);

});
