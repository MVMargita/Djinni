// отримати всі посилання в меню навігації
var navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (navLink) {
	navLink.addEventListener("click", function () {
		navLinks.forEach(function (link) {
			link.classList.remove("active");
		});
		navLink.classList.add("active");
	});
});

const cardTextElements = document.querySelectorAll(".card-text");

cardTextElements.forEach((cardText) => {
	const cardTextContent = cardText.textContent.trim();

	if (cardTextContent.length > 100) {
		const truncatedText = cardTextContent.slice(0, 100).trim();
		const remainingText = cardTextContent.slice().trim();

		const truncatedTextWithEllipsis = `${truncatedText}...`;

		cardText.innerHTML = `
      <span class="truncated-text">${truncatedTextWithEllipsis}</span>
      <span class="remaining-text visually-hidden">${remainingText}</span>
      <a class="btn btn-link show-more-btn">Show more...</a>
    `;

		const showMoreBtn = cardText.querySelector(".show-more-btn");
		const showLessBtn = document.createElement("a");
		showLessBtn.classList.add("btn", "btn-link", "show-less-btn");
		showLessBtn.textContent = "Show less...";
		const truncatedTextSpan = cardText.querySelector(".truncated-text");
		const remainingTextSpan = cardText.querySelector(".remaining-text");

		function toggleText() {
			truncatedTextSpan.classList.toggle("visually-hidden");
			remainingTextSpan.classList.toggle("visually-hidden");
			showMoreBtn.classList.toggle("visually-hidden");
			cardText.classList.toggle("show-full-text");
			if (cardText.classList.contains("show-full-text")) {
				cardText.appendChild(showLessBtn);
			} else {
				cardText.removeChild(showLessBtn);
			}
		}

		showMoreBtn.addEventListener("click", toggleText);
		showLessBtn.addEventListener("click", toggleText);
	}

	/* scroll */
	const cardsContainer = document.querySelector(".cards-container");
	let page = 1;

	function loadMoreCards() {
		fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`)
			.then((response) => response.json())
			.then((data) => {
				data.forEach((cardData) => {
					const card = document.createElement("div");
					card.classList.add("col-12", "col-md-6", "p-3");
					card.innerHTML = `
          <div class="card">
            <img src="${cardData.download_url}" class="card-img-top" alt="${cardData.author}">
            <div class="card-body">
              <h2 class="card-title">${cardData.author}</h2>
              <p class="card-text">${cardData.url}</p>
            </div>
            <div class="card-btn">
              <a href="#" class="btn btn-primary btn-save">Save to collection</a>
              <a href="#" class="btn btn-primary btn-share">Share</a>
            </div>
          </div>
        `;
					cardsContainer.appendChild(card);
				});
				page++;
			})
			.catch((error) => console.error(error));
	}

	window.addEventListener("scroll", () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 5) {
			loadMoreCards();
		}
	});

	loadMoreCards();

	
});
