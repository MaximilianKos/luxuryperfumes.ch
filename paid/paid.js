document.addEventListener('DOMContentLoaded', function () {
	const orderNumber = Math.floor(Math.random() * 1000000000);
	const orderNumberElement = document.getElementById('order-number');
	orderNumberElement.innerHTML = orderNumber;

	const cartCookie = getCookie('cart');

	if (cartCookie) {
		const orderedItems = JSON.parse(cartCookie);
		const orderedItemsElement = document.getElementById('ordered-items');
		let totalPrice = 0;
		const itemCounts = {};

		orderedItems.forEach((item) => {
			itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
		});

		orderedItems.forEach((item) => {
			if (itemCounts[item.name] > 0) {
				const itemElement = document.createElement('div');
				itemElement.classList.add('ordered-item', 'align-items-center', 'row');

				const itemPrice = parseFloat(item.price);
				const itemTotal = itemPrice * itemCounts[item.name];
				totalPrice += itemTotal;

				itemElement.innerHTML = `
                    <div class="col-md-2"><img src="${item.image}" alt="${item.name}" class="img-fluid"></div>
                    <div class="col-md-4"><h3>${item.name}</h3></div>
                    <div class="col-md-2">Quantity: ${itemCounts[item.name]}</div>
                    <div class="col-md-2">Price: ${itemPrice.toFixed(2)} CHF</div>
                    <div class="col-md-2">Total: ${itemTotal.toFixed(2)} CHF</div>
                `;
				orderedItemsElement.appendChild(itemElement);
				itemCounts[item.name] = 0;
			}
		});

		const totalItems = orderedItems.length;
		const shippingCost = totalItems * 5 * 0.8;
		totalPrice += shippingCost;

		const shippingPriceElement = document.createElement('div');
		shippingPriceElement.classList.add('shipping-price');
		shippingPriceElement.innerHTML = `<strong>Shipping: </strong>CHF${shippingCost.toFixed(2)}`;
		orderedItemsElement.appendChild(shippingPriceElement);

		const country = window.location.search.split('=')[1];

		const shippingTimeElement = document.getElementById('shipping-time');
		const shippingTime = Math.floor(Math.random() * 10) + 1;
		shippingTimeElement.innerHTML = `Orders to ${country} usually take ${shippingTime} days to arrive.`;

		const totalPriceElement = document.createElement('div');
		totalPriceElement.classList.add('total-price');
		totalPriceElement.innerHTML = `<strong>Total Price: </strong>CHF${totalPrice.toFixed(2)}`;
		orderedItemsElement.appendChild(totalPriceElement);

		document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	} else {
		window.location.href = '../products/products.html';
	}
});
