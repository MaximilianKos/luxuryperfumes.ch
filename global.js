document.addEventListener('DOMContentLoaded', function () {
	populateCartDropdown();
});

function populateCartDropdown() {
	const cartDropdown = document.getElementById('cartItemsDropdown');

	cartDropdown.innerHTML = '';

	const cartCookie = getCookie('cart');

	if (cartCookie && cartCookie !== '[]') {
		const cartItems = JSON.parse(cartCookie);

		const itemCounts = {};
		cartItems.forEach((item, index) => {
			const itemName = item.name;
			itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
		});

		Object.keys(itemCounts).forEach((itemName) => {
			const itemCount = itemCounts[itemName];
			const item = cartItems.find((i) => i.name === itemName);

			const dropdownItem = document.createElement('div');
			dropdownItem.classList.add('dropdown-item');

			const img = document.createElement('img');
			img.src = item.image;
			img.width = 50;
			img.height = 50;
			dropdownItem.appendChild(img);

			const text = document.createElement('span');
			text.textContent = `(${itemCount}x) ${item.name} - ${item.price} CHF`;
			dropdownItem.appendChild(text);

			const deleteIcon = document.createElement('span');
			deleteIcon.classList.add('material-symbols-outlined', 'align-self-center', 'text-danger', 'ms-1');
			deleteIcon.textContent = 'delete';
			deleteIcon.style.cursor = 'pointer';
			deleteIcon.style.marginLeft = 'auto';

			deleteIcon.addEventListener('click', () => {
				removeItemFromCart(itemName);
			});

			dropdownItem.style.display = 'flex';
			dropdownItem.style.justifyContent = 'space-between';
			dropdownItem.appendChild(deleteIcon);

			dropdownItem.classList.add('d-flex', 'align-items-center');

			cartDropdown.appendChild(dropdownItem);
		});
		const checkoutButton = document.createElement('button');
		checkoutButton.classList.add('btn', 'btn-primary', 'w-100');
		checkoutButton.textContent = 'Go to Checkout';
		checkoutButton.addEventListener('click', () => {
			window.location.href = '../checkout/checkout.html';
		});
		cartDropdown.appendChild(checkoutButton);
	} else {
		const emptyItem = document.createElement('a');
		emptyItem.classList.add('dropdown-item');
		emptyItem.href = '#';
		emptyItem.textContent = 'Cart is empty';
		cartDropdown.appendChild(emptyItem);
	}
}

function removeItemFromCart(itemName) {
	const cartCookie = getCookie('cart');

	if (cartCookie) {
		const cartItems = JSON.parse(cartCookie);

		const itemIndex = cartItems.findIndex((i) => i.name === itemName);

		if (itemIndex > -1) {
			cartItems.splice(itemIndex, 1);
			document.cookie = `cart=${JSON.stringify(cartItems)};path=/`;
			populateCartDropdown();
		}
	}
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
