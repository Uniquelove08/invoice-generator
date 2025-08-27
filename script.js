document.getElementById("date").valueAsDate = new Date();
function addRow() {
 const row = `<tr>
     <td><input type="text" placeholder="Item description"></td>
          <td><input type="number" value="1" min="1" class="qty"></td>
          <td><input type="number" value="0" min="0" class="rate"></td>
          <td class="lineTotal">0.00</td>
          <td class="no-print"><button class="btn" onclick="removeRow(this)">X</button></td>
     </tr>
   `;
  document.getElementById("invoiceBody").insertAdjacentHTML('beforeend', row);
  attachListeners();
  calculateTotal();
}

function removeRow(btn) {
    btn.closest("tr").remove();
    calculateTotal();
}


function attachListeners() {
    const qtyInputs = document.querySelectorAll(".qty");
    const rateInputs = document.querySelectorAll(".rate");
    qtyInputs.forEach(input => input.oninput = calculateTotal);
    rateInputs.forEach(input => input.oninput = calculateTotal);
    // Attach discount listener every time in case input is re-rendered
    const discountInput = document.getElementById("discountInput");
    if (discountInput) {
        discountInput.oninput = calculateTotal;
    }
}

function calculateTotal() {
    let subtotal = 0;
    document.querySelectorAll("#invoiceBody tr").forEach(row => {
        const qtyInput = row.querySelector(".qty");
        const rateInput = row.querySelector(".rate");
        const qty = qtyInput ? parseFloat(qtyInput.value) || 0 : 0;
        const rate = rateInput ? parseFloat(rateInput.value) || 0 : 0;
        const total = qty * rate;
        const lineTotal = row.querySelector(".lineTotal");
        if (lineTotal) lineTotal.textContent = total.toFixed(2);
        subtotal += total;
    });
    const subtotalSpan = document.getElementById("subtotal");
    if (subtotalSpan) subtotalSpan.textContent = subtotal.toFixed(2);
    // Get discount value
    const discountInput = document.getElementById("discountInput");
    let discount = discountInput ? parseFloat(discountInput.value) || 0 : 0;
    if (discount > subtotal) discount = subtotal;
    const discountSpan = document.getElementById("discount");
    if (discountSpan) discountSpan.textContent = discount.toFixed(2);
    const tax = (subtotal - discount) * 0.05;
    const taxSpan = document.getElementById("tax");
    if (taxSpan) taxSpan.textContent = tax.toFixed(2);
    const grandTotalSpan = document.getElementById("grandTotal");
    if (grandTotalSpan) grandTotalSpan.textContent = ((subtotal - discount) + tax).toFixed(2);
}

window.onload = function() {
    attachListeners();
    calculateTotal();
}

