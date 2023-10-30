/* on load */
document.addEventListener('DOMContentLoaded', function () {
	const url = new URL(window.location.href);
	/*If no parameters are found redirect to products*/
	if (!url.searchParams.get('title')) {
		console.log('No parameters found');
		window.location.href = '../products/products.html';
	}

	const title = url.searchParams.get('title');
	const description = url.searchParams.get('description');
	const image = url.searchParams.get('image');
	const price = url.searchParams.get('price');

	const nameElement = document.getElementById('product-name');
	const descriptionElement = document.getElementById('product-description');
	const imageElement = document.getElementById('product-image');
	const priceElement = document.getElementById('product-price');

	nameElement.innerHTML = title;
	descriptionElement.innerHTML = description;
	imageElement.src = image;
	priceElement.innerHTML = price;
});
