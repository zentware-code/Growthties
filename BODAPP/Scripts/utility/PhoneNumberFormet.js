function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    let numbers = input.value.replace(/[^0-9]/g, '');

    // Limit to 10 digits
    numbers = numbers.slice(0, 10);
    // Format the number
    let formattedNumber = '';
    if (numbers.length > 0) {
        formattedNumber += numbers.slice(0, 2) + ' ';
    }
    if (numbers.length > 2) {
        formattedNumber += numbers.slice(2, 5) + ' ';
    }
    if (numbers.length > 5) {
        formattedNumber += numbers.slice(5, 9);
    }
    // Update the input value
    input.value = formattedNumber.trim();
}


function formatTenDigit(input) {
    let numbers = input.value.replace(/[^0-9]/g, '');
    numbers = numbers.slice(0, 10);
    input.value = numbers;
}


function formatPostalCode(input) {
    let numbers = input.value.replace(/[^0-9]/g, '');
    numbers = numbers.slice(0, 4);
    input.value = numbers;
}



function formatCurrency(input) {
    let numbers = input.value.replace(/[^0-9.]/g, '');
   
    const [integerPart, decimalPart] = numbers.split('.');

    let limitedIntegerPart = integerPart ? integerPart.slice(0, 15) : '';
    let limitedDecimalPart = (decimalPart || '').slice(0, 2);
    
    let formattedInteger = limitedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    let formattedNumber = formattedInteger;
    if (limitedDecimalPart) {
        formattedNumber += '.' + limitedDecimalPart;
    }

    input.value = formattedNumber.trim();

    const trimmedValue = formattedNumber.replace(/\s/g, '').replace(/[^0-9.]/g, '');
    document.getElementById('txtBudget').value = trimmedValue;
}

function formatCurrencyRetrive(value) {
    // Format the value as currency for display
    let numbers = value.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = numbers.split('.');
    let limitedIntegerPart = integerPart ? integerPart.slice(0, 15) : '';
    let limitedDecimalPart = (decimalPart || '').slice(0, 2);
    let formattedInteger = limitedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    let formattedNumber = formattedInteger;

    if (limitedDecimalPart) {
        formattedNumber += '.' + limitedDecimalPart;
    }

    return formattedNumber.trim(); 
}

document.addEventListener('DOMContentLoaded', function () {
   
    var budgetElements = document.getElementsByClassName('total-budget');
    
    for (var i = 0; i < budgetElements.length; i++) {
        var totalBudget = budgetElements[i].textContent.trim();
        var formattedBudget = formatCurrencyRetrive(totalBudget);

        budgetElements[i].textContent = formattedBudget;
    }
});




function formatToZAR(amount, selector) {
    // Ensure two decimal places
    let parts = Number(amount).toFixed(2).split('.');
    
    // Add space as thousand separator
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    // Combine and add "R " in front
    let formatted = 'R ' + parts.join('.');
    
    // Set the formatted value to the element
    $(selector).html(formatted);
}

//function formatToZAR(amount) {
//    let parts = Number(amount).toFixed(2).split('.');
//    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
//    return 'R ' + parts.join('.');
//}