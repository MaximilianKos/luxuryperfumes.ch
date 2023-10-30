document.addEventListener('DOMContentLoaded', function () {
	const cards = Array.from(document.querySelectorAll('.card.shadow-sm.h-100'));

	cards.forEach((card) => {
		card.addEventListener('click', function () {
			const title = encodeURIComponent(card.querySelector('h4').innerText);
			const description = encodeURIComponent(card.querySelector('.card-text').innerText);
			const image = encodeURIComponent(card.querySelector('img').getAttribute('src'));
			const price = encodeURIComponent(card.querySelector('h5').innerText);

			const newUrl = `../detail/detail.html?title=${title}&description=${description}&image=${image}&price=${price}`;

			window.location.href = newUrl;
		});
	});
});
