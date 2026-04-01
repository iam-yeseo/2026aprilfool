// Main interactions for purchase controls, toast notifications, and timed sale badge.
document.addEventListener('DOMContentLoaded', () => {
  const productImage = document.getElementById('product-image');
  const placeholder = document.getElementById('product-placeholder');
  const quantityInput = document.getElementById('quantity');
  const increaseBtn = document.getElementById('increase');
  const decreaseBtn = document.getElementById('decrease');
  const addCartBtn = document.getElementById('add-cart');
  const buyNowBtn = document.getElementById('buy-now');
  const toast = document.getElementById('toast');
  const countdownTimer = document.getElementById('countdown-timer');

  // Fallback for missing image asset.
  productImage.addEventListener('error', () => {
    productImage.hidden = true;
    placeholder.hidden = false;
  });

  // Quantity controls.
  const clampQuantity = () => {
    const currentValue = Number(quantityInput.value) || 1;
    quantityInput.value = Math.max(1, currentValue);
  };

  increaseBtn.addEventListener('click', () => {
    quantityInput.value = (Number(quantityInput.value) || 1) + 1;
  });

  decreaseBtn.addEventListener('click', () => {
    quantityInput.value = Math.max(1, (Number(quantityInput.value) || 1) - 1);
  });

  quantityInput.addEventListener('change', clampQuantity);

  // Toast utility.
  let toastTimeout;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  };

  addCartBtn.addEventListener('click', () => {
    clampQuantity();
    showToast(`Added ${quantityInput.value} PTZ-10000X unit(s) to cart. Launch prep initiated.`);
  });

  buyNowBtn.addEventListener('click', () => {
    clampQuantity();
    showToast('Instant checkout engaged. Contact mission control for delivery ETA.');
  });

  // Countdown to end of April 1 (local time).
  const updateCountdown = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;

    if (diff <= 0) {
      countdownTimer.textContent = '00:00:00';
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    countdownTimer.textContent = `${hours}:${minutes}:${seconds}`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
