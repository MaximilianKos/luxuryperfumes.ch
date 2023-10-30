function populatePriceList() {
	const priceList = document.querySelector('.list-group.mb-3');

	priceList.innerHTML = '';

	const cartCookie = getCookie('cart');

	let total = 0;
	const itemCounts = {};

	if (cartCookie && cartCookie !== '[]') {
		const cartItems = JSON.parse(cartCookie);

		cartItems.forEach((item) => {
			itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
		});

		cartItems.forEach((item) => {
			if (itemCounts[item.name] > 0) {
				const listItem = document.createElement('li');
				listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');

				const itemName = document.createElement('span');
				itemName.textContent = item.name;
				listItem.appendChild(itemName);

				if (itemCounts[item.name] > 1) {
					itemName.textContent += ` (x${itemCounts[item.name]})`;
				}

				const itemPrice = document.createElement('span');
				itemPrice.textContent = `${(parseFloat(item.price) * itemCounts[item.name]).toFixed(2)} CHF`;
				listItem.appendChild(itemPrice);

				total += parseFloat(item.price) * itemCounts[item.name];

				priceList.appendChild(listItem);

				itemCounts[item.name] = 0;
			}
		});

		const totalItems = cartItems.length;

		const shippingItem = document.createElement('li');
		shippingItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');

		const shippingName = document.createElement('span');
		shippingName.textContent = 'Shipping';
		shippingItem.appendChild(shippingName);

		const shippingPrice = document.createElement('span');
		const shippingCost = totalItems * 5 * 0.8;
		shippingPrice.textContent = `${shippingCost.toFixed(2)} CHF`;
		shippingItem.appendChild(shippingPrice);

		total += 5;

		priceList.appendChild(shippingItem);

		const totalItem = document.createElement('li');
		totalItem.classList.add('list-group-item', 'd-flex', 'justify-content-between');

		const totalName = document.createElement('strong');
		totalName.textContent = 'Total';
		totalItem.appendChild(totalName);

		const totalPrice = document.createElement('strong');
		totalPrice.textContent = `${total.toFixed(2)} CHF`;
		totalItem.appendChild(totalPrice);

		priceList.appendChild(totalItem);
	} else {
		const emptyItem = document.createElement('li');
		emptyItem.classList.add('list-group-item');
		emptyItem.textContent = 'Cart is empty';
		priceList.appendChild(emptyItem);
	}
}

populatePriceList();

function handleSubmit(event) {
	event.preventDefault();

	const form = event.target;
	if (form.checkValidity()) {
		const country = form.querySelector('#customerCountry').value;
		window.location.href = '../paid/paid.html?country=' + country;
	} else {
		alert('Please fill in all required fields.');
		form.reportValidity();
	}
}
