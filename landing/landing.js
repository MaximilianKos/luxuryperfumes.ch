document.addEventListener('DOMContentLoaded', function () {
	const cardImages = Array.from(document.querySelectorAll('.card.shadow-sm.h-100 img'));

	cardImages.forEach((image) => {
		image.addEventListener('click', function () {
			const card = this.closest('.card');
			const title = encodeURIComponent(card.querySelector('h4').innerText);
			const description = encodeURIComponent(card.querySelector('.card-text').innerText);
			const imageUrl = encodeURIComponent(this.getAttribute('src'));
			const price = encodeURIComponent(card.querySelector('h5').innerText);

			const newUrl = `../detail/detail.html?title=${title}&description=${description}&image=${imageUrl}&price=${price}`;

			window.location.href = newUrl;
		});
	});

	const addToCartButtons = document.querySelectorAll('.btn-outline-warning');

	addToCartButtons.forEach((button) => {
		button.addEventListener('click', function () {
			const cardBody = this.closest('.card-body');
			const productName = cardBody.querySelector('h4').textContent;
			const productDescription = cardBody.querySelector('.card-text').textContent;
			let productPrice = cardBody.querySelector('h5').textContent;
			const productImage = this.closest('.card').querySelector('img').src;

			productPrice = productPrice.replace('CHF', '').trim();

			const productInfo = {
				name: productName,
				description: productDescription,
				price: productPrice,
				image: productImage,
			};

			let cart = [];
			const existingCart = getCookie('cart');
			if (existingCart) {
				cart = JSON.parse(existingCart);
			}

			cart.push(productInfo);

			document.cookie = `cart=${JSON.stringify(cart)};path=/`;
			const alertElement = document.createElement('div');
			alertElement.className = 'alert alert-success';
			alertElement.textContent = `${productName} has been added to your cart.`;
			alertElement.setAttribute('role', 'alert');

			document.body.appendChild(alertElement);

			setTimeout(() => {
				alertElement.remove();
			}, 3000);
			populateCartDropdown();
		});
	});
});
