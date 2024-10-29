let seatSelected = false;
function selectSeat() {
  seatSelected = true; 
  updateButton(); 
}

function updateButton() {
  const phoneInput = document.getElementById("phoneInput").value;
  const nextButton = document.getElementById("nextButton");
 
  if (seatSelected && phoneInput) {
    nextButton.style.backgroundColor = "#1DD100";
    nextButton.disabled = false;
  } else {
    nextButton.style.backgroundColor = "gray";
    nextButton.disabled = true;
  }
}
function onPhoneInput() {
  
  if (seatSelected) {
    updateButton();
  }
}
document.getElementById("phoneInput").addEventListener("input", onPhoneInput);
