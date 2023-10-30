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
});
