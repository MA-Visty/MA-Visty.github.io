function copyText(element) {
	// Copy le texte
	navigator.clipboard.writeText($("#"+element).text());

	// Cree une info bull pour le copy
	let popup = $('<div id="contentPopup"><div id="popup">Copier !</div></div>');
	$("body").append(popup);

	popup.css("display", "none");
	
	setTimeout(function() {
		popup.css("display", "none");
		popup.remove();
	}, 2000);
	setTimeout(function() {
		popup.css("display", "flex");
	}, 50);
}

function calculAge() {
	let ageDate = new Date($("#age").text().slice(1, -1));
	let nowDate = new Date();
	let age = nowDate.getFullYear() - ageDate.getFullYear();
	if(nowDate.getMonth()+1 < ageDate.getMonth()+1 || nowDate.getDate() < ageDate.getDate()) {
		age -= 1;
	}
	
	if(!isNaN(parseInt(age))) {
		$("#age").text("(" + age.toString() + " ans)");
		$("#age").css("display", "inline");
	}
}

function scrollArrow() {
	if (isAnimating) {
		return;
	}
	if(parseInt($(window).scrollTop() + $(window).height())+10 >= $(document).height() || angleArrow == 180) {
		$("html, body").animate({ "scrollTop": "0" }, 250, () => {
			isAnimating = false;
		});
	} else {
		let pos = $(window).scrollTop() + $(window).height();
		$("html, body").animate({ "scrollTop": pos }, 250, () => {
			isAnimating = false;
		});
	}
	isAnimating = true;
}

function rotateArrow() {
	var scrollPosition = $(window).scrollTop();
	var windowHeight = $(window).height();
	var documentHeight = $(document).height();
	
	if (scrollPosition === 0) {
		$("#imgArrow").css("transform", "rotate(0deg) scale(1, 0.5)");
		angleArrow = 0;
	}
	if(scrollPosition + windowHeight >= documentHeight) {
		$("#imgArrow").css("transform", "rotate(180deg) scale(1, 0.5)");
		angleArrow = 180;
	}
}

function updateZone() {
	$(".invisible").each(function() {
		if($(window).scrollTop() + ($(window).height()*1) >= $(this).offset().top) {
			$(this).removeClass("invisible");
		}
	});
}

function checkCard(id) {
	$("#defil"+id).children().each(function(index) {
		var distanceLeft = $(this).offset().left;
		var distanceRight = $(window).width() - ($(this).offset().left + $(this).outerWidth());

		if(valDec[id-1] < 0) {
			if(distanceLeft < ($(window).width() / 2) - ($(this).outerWidth(true) * 2) || distanceRight < ($(window).width() / 2) - ($(this).outerWidth(true) * 4)) {
				$(this).addClass("hidden");
			}
			else {
				$(this).removeClass("hidden");
			}
		} else {
			if(distanceLeft < ($(window).width() / 2) - ($(this).outerWidth(true) * 4) || distanceRight < ($(window).width() / 2) - ($(this).outerWidth(true) * 2)) {
				$(this).addClass("hidden");
			}
			else {
				$(this).removeClass("hidden");
			}
		}
	});
}

function defilCard(id) {
	// Cache ou montre les card
	checkCard(id);
	// Fait défiler
	setTimeout(function() {
		$("#defil"+id).animate({ "margin-left": "+=" + valDec[id-1] + "px"}, 250, "linear");
		if(valDec[id-1] < 0) {
			posCard[id-1] += 1;
		} else {
			posCard[id-1] -= 1;
		}
		if(posCard[id-1] == $("#defil"+id).children().length-1 && valDec[id-1] < 0) {
			valDec[id-1] = -valDec[id-1];
		}
		if(posCard[id-1] == 0 && valDec[id-1] > 0) {
			valDec[id-1] = -valDec[id-1];
		}
		defilCard(id);
	}, 1500);
}

$("body").css("display", "none");

var isAnimating = false;
var angleArrow = 0;
var posCard = Array(0, 0);
var valDec = Array(-150, -150);
$(document).ready(function() {
	$("body").css("display", "initial");
	calculAge();
	rotateArrow();

	$(".apparition").addClass("invisible");
	updateZone();

	$(".defil").css("flex-flow", "row nowrap");
	$(".defil").css("justify-content", "flex-start");
	$(".defil").css("width", "200%");
	$(".defil").css("margin-left", "calc(50% - 75px)");
	defilCard(1);
	defilCard(2);
	
	$(window).scroll(() => {
		rotateArrow();
		updateZone();
	});
	$(window).on({
		"touchmove": function(e) { 
			rotateArrow();
			updateZone();

			let popup = $('<div id="contentPopup"><div id="popup">Copier !</div></div>');
			$("body").append(popup);

			popup.css("display", "none");

			setTimeout(function() {
				popup.css("display", "none");
				popup.remove();
			}, 2000);
			setTimeout(function() {
				popup.css("display", "flex");
			}, 50);
		}
	});
});