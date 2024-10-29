const seats = document.querySelectorAll('.seat');

let selectedSeats = [];
let totalPrice = 0;
const pricePerSeat = 550;
const maxSeats = 4;
let seatLeft = 40; 
let grandTotal = 0;
let discountAmount = 0;

const seatCountElement = document.getElementById('seat-count');
const seatDetailsList = document.getElementById('seat-details-list');
const totalPriceElement = document.getElementById('total-price');
const totalseatleftElement = document.getElementById('Available-seat');
const grandTotalPrice = document.getElementById('grand-total-price');
const applyButton = document.getElementById('apply-button');
const discountPriceElement = document.getElementById('discount-price');
const couponInput = document.getElementById('coupon-code');

//handle seat selection and deselection
seats.forEach(function(seat) {
  seat.addEventListener('click', function() {
    if (seat.classList.contains('seat-selected')) {
      seat.classList.remove('seat-selected');
      const seatIndex = selectedSeats.indexOf(seat.textContent);
      if (seatIndex > -1) {
        selectedSeats.splice(seatIndex, 1);
      }
      totalPrice -= pricePerSeat;
      seatLeft++;
    } else {
      if (selectedSeats.length < maxSeats) {
        seat.classList.add('seat-selected');
        selectedSeats.push(seat.textContent);
        totalPrice += pricePerSeat;
        seatLeft--;
      } else {
        alert('You can only select up to 4 seats.');
      }
    }
    
    updateSeatInfo();
    toggleApplyButton();
  });
});

//seat information display
function updateSeatInfo() {
  seatCountElement.textContent = selectedSeats.length;
  totalseatleftElement.textContent = seatLeft;
  seatDetailsList.innerHTML = '';

  selectedSeats.forEach(function(seatNumber) {
    const seatDetailDiv = document.createElement('div');
    seatDetailDiv.className = 'seat-detail';
    seatDetailDiv.style.display = 'flex';
    seatDetailDiv.style.justifyContent = 'space-between';

    const seatNumberElement = document.createElement('div');
    seatNumberElement.textContent = seatNumber;
    seatDetailDiv.appendChild(seatNumberElement);

    const seatClassElement = document.createElement('div');
    seatClassElement.textContent = 'Economy';
    seatDetailDiv.appendChild(seatClassElement);

    const seatPriceElement = document.createElement('div');
    seatPriceElement.textContent = `BDT ${pricePerSeat}`;
    seatDetailDiv.appendChild(seatPriceElement);

    seatDetailsList.appendChild(seatDetailDiv);
  });

  totalPriceElement.textContent = `BDT ${totalPrice}`;
  updateGrandTotal(); 
}

//toggle the Apply button based on seat selection
function toggleApplyButton() {
  if (selectedSeats.length === maxSeats) {
    applyButton.style.backgroundColor = '#1DD100';
    applyButton.disabled = false;
  } else {
    applyButton.style.backgroundColor = 'gray';
    applyButton.disabled = true;
  }
}

//calculate discount and update prices
function applyDiscount() {
  const couponCode = couponInput.value.trim();
  discountAmount = 0;

  if (couponCode === 'NEW15') {
    discountAmount =  Math.round(totalPrice * 0.15 * 100) / 100; // 15% discount
  } else if (couponCode === 'Couple20') {
    discountAmount = Math.round(totalPrice * 0.20 * 100) / 100;// 20% discount
  } else {
    alert('Invalid coupon code.');
  }

  discountPriceElement.textContent = `BDT ${discountAmount}`;
  updateGrandTotal();
  
}


//update the grand total
function updateGrandTotal() {
  grandTotal = totalPrice - discountAmount;
  grandTotalPrice.textContent = `BDT ${grandTotal}`;
}

//Apply button to apply discount
applyButton.addEventListener('click', applyDiscount);
