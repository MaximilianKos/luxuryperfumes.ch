document.addEventListener('DOMContentLoaded', function () {
	const url = new URL(window.location.href);

	if (!url.searchParams.get('title')) {
		window.location.href = '../products/products.html';
	}

	const title = decodeURIComponent(url.searchParams.get('title'));
	const description = decodeURIComponent(url.searchParams.get('description'));
	const image = decodeURIComponent(url.searchParams.get('image'));
	const price = decodeURIComponent(url.searchParams.get('price'));

	const nameElement = document.getElementById('product-name');
	const descriptionElement = document.getElementById('product-description');
	const imageElement = document.getElementById('product-image');
	const priceElement = document.getElementById('product-price');

	nameElement.innerHTML = title;
	descriptionElement.innerHTML = description;
	imageElement.src = image;
	priceElement.innerHTML = price;

	const addToCartButton = document.querySelector('.btn-outline-secondary');

	addToCartButton.addEventListener('click', function () {
		const productInfo = {
			name: title,
			description: description,
			price: price,
			image: image,
		};

		let cart = [];
		const existingCart = getCookie('cart');
		if (existingCart) {
			cart = JSON.parse(existingCart);
		}

		cart.push(productInfo);

		document.cookie = `cart=${JSON.stringify(cart)};path=/`;

		const alertElement = document.createElement('div');
		alertElement.className = 'alert alert-success fixed-alert';
		alertElement.textContent = `${title} has been added to your cart.`;
		alertElement.setAttribute('role', 'alert');
		document.body.appendChild(alertElement);

		setTimeout(() => {
			alertElement.remove();
		}, 3000);
		populateCartDropdown();
	});
});
