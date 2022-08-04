document.querySelector(".search").addEventListener("submit", (event) => {
	// Prevent page reload
	event.preventDefault();
	return getBooks(), document.querySelector("header").classList.remove("height");
});

// Getting the API data
const fetchBooks = async (input) => {
	const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`);

	return await response.json();
};

async function getBooks() {
	const input = document.querySelector("#search-input").value;

	const data = await fetchBooks(input);
	// Setting default of output to empty string
	let output = "";
	// Assigning the results to a variable and displaying the variable
	try {
		data.items.forEach((book) => {
			output += `
            <div class="bookcard">
                <div>
                    <img class="bookcard--img" src=${
						// If no thumbnail is found it displays the placeholder
						book.volumeInfo.imageLinks === undefined || null
							? "./assets/placeholder.png"
							: `${book.volumeInfo.imageLinks.thumbnail}`
					}>
                    
                    <div>
                        <a href=${book.volumeInfo.canonicalVolumeLink} target="_blank">
                        <button class="bookcard--button">more info  <i class="fa-solid fa-circle-info bookcard--button--icon"></i></button></a></div>
                    </div>

                <div>
                    <h3 class="bookcard--title">${
						// Looks for book title otherwise displays title unavailable
						book.volumeInfo.title ? book.volumeInfo.title : "<i>title unavailable</i>"
					}</h3>

                    <h4 class="bookcard--author">${
						// Looks for author otherwise displays author unavailable
						book.volumeInfo.authors
							? "by " + book.volumeInfo.authors.join(", ")
							: "<i>author unavailable</i>"
					}</h4>

                    <p class="bookcard--description">${
						// Looks for description otherwise display description unavailable
						book.volumeInfo.description
							? book.volumeInfo.description
							: "<i>description unavailable</i>"
					}</p>
                </div>
            </div>
        `;
		});

		// If no results are found it returns an error message
	} catch {
		output += `
            <div class="bookcard">
                <p class="bookcard--error">
                    No results found for "${input}" 
                    <i class="fa-solid fa-circle-exclamation"></i>
                </p>
            </div>
        `;
	}

	document.querySelector("#output").innerHTML = output;
}
