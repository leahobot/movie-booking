const select = document.getElementById("select-movie");
const seats = document.querySelectorAll(".rows .seat:not(.occupied");
const seatContainer = document.querySelector(".selection-container");

let moviePrice = parseInt(select.value);

seatContainer.addEventListener("click", selectSeat);
select.addEventListener("change", selectMovie);
document.addEventListener("DOMContentLoaded", getData);

function setSelectedMovie(movieIndex, price) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", price);
}

function selectSeat(event) {
	if (
		event.target.classList.contains("seat") &&
		!event.target.classList.contains("occupied")
	) {
		event.target.classList.toggle("selected");
	}

	updateSelected();
}

function updateSelected() {
	const selectedSeats = document.querySelectorAll(".rows .seat.selected");

	const seatArray = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
	localStorage.setItem("selectedSeats", JSON.stringify(seatArray));

	const seatCount = document.querySelector(".count");
	const total = document.querySelector(".total");

	const count = selectedSeats.length;
	seatCount.innerText = count;
	total.innerText = count * moviePrice;
	if (total.innerText === "NaN") {
		total.innerText = 0;
	}
}

function selectMovie(event) {
	const total = document.querySelector(".total");
	moviePrice = parseInt(event.target.value);
	updateSelected();
	setSelectedMovie(event.target.selectedIndex, event.target.value);
}

function getData(event) {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selections = localStorage.getItem("selectedMovieIndex");
	if (selections !== null && selections > 0) {
		select.selectedIndex = selections;
	}
	updateSelected();

	const total = document.querySelector(".total");
	const price = localStorage.getItem("selectedMoviePrice");
	if (price !== null && price > 0) {
		total.innerText = selectedSeats.length * parseInt(price);
	} else {
		total.innerText = 0;
	}
}
