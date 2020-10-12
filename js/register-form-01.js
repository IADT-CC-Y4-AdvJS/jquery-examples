function checkPostCode() {
  // For each country, defines the pattern that the ZIP has to follow
  var constraints = {
    "ie" : {
      "regexp" : '^([ac-fhknprtv-yAC-FHKNPRTV-Y]\d{2}|D6W)\s*[0-9ac-fhknprtv-yAC-FHKNPRTV-Y]{4}',
      "message": 'Please re-check your details or find your correct Eircode <a href="https://finder.eircode.ie/#/" target="_blank">here</a>'
    },
    "uk" : {
      "regexp" : '^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$',
      "message": 'Please re-check your details or find your correct post code <a href="https://www.royalmail.com/find-a-postcode" target="_blank">here</a>'
    },
    "es" : {
      "regexp" : '^(ES-)?\\d{5}$',
      "message": 'Spain ZIPs must have exactly 4 digits: e.g. ES-29780 or 29780'
    },
    "fr" : {
      "regexp" : '^(F-)?\\d{5}$',
      "message": 'France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012'
    },
    "de" : {
      "regexp" : '^(D-)?\\d{5}$',
      "message": 'Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345'
    },
    "nl" : {
      "regexp" : '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])',
      "message": 'Nederland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS'
    }
  };

  // Read the country id
  var country = document.getElementById("country").value;

  // Get the post code field
  var postcodeField = document.getElementById("postcode");

  // Build the constraint checker
  var constraint = new RegExp(constraints[country].regexp, "");

  // Check it!
  if (constraint.test(postcodeField.value)) {
    // The post code follows the constraint, we use the ConstraintAPI to tell it
    postcodeField.setCustomValidity("");
  }
  else {
    // The post code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    postcodeField.setCustomValidity(constraints[country].message);
  }
}

function checkFileSize() {
  var profile = document.getElementById("profile");
  var files = profile.files;

  // If there is (at least) one file selected
  if (files.length > 0) {
     if (files[0].size > 75 * 1024) { // Check the constraint
       profile.setCustomValidity("The selected file must not be larger than 75 kB");
       return;
     }
  }
  // No custom constraint violation
  profile.setCustomValidity("");
}

function checkCardNumber() {
  // For each country, defines the pattern that the ZIP has to follow
  var constraints = {
    "visa" : {
      "regexp" : '^4[0-9]{12}(?:[0-9]{3})?$',
      "message": 'All Visa card numbers start with a 4. New cards have 16 digits; old cards have 13 digits. Please check your VISA card number.'
    },
    "mastercard" : {
      "regexp" : '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$',
      "message": 'MasterCard numbers either start with the numbers 51 through 55 or with the numbers 2221 through 2720. All have 16 digits. Please check your MasterCard card number.'
    },
    "amex" : {
      "regexp" : '^3[47][0-9]{13}$',
      "message": 'American Express card numbers start with 34 or 37 and have 15 digits. Please check your American Express card number.'
    }
  };

  var cardNumberField = document.getElementById("card-number");
  var cardTypeField = document.querySelector("input[name=card-type]:checked");
  if (cardTypeField !== null) {
    var cardType = cardTypeField.value;
    var constraint = new RegExp(constraints[cardType].regexp, "");
    if (constraint.test(cardNumberField.value)) {
      cardNumberField.setCustomValidity("");
    }
    else {
      cardNumberField.setCustomValidity(constraints[cardType].message);
    }
  }
  else {
    cardNumberField.setCustomValidity("Select a card type to validate your card number.");
  }
}


window.onload = function () {
  document.getElementById("country").onchange = checkPostCode;
  document.getElementById("postcode").oninput = checkPostCode;

  document.getElementById("profile").onchange = checkFileSize;

  document.querySelectorAll("input[name=card-type]").forEach(function(radio) {
    radio.onchange = checkCardNumber;
  });
  document.getElementById("card-number").oninput = checkCardNumber;
}
