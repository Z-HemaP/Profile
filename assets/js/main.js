/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);

// // Add this JavaScript
// document.addEventListener('DOMContentLoaded', function() {
//     const learnMoreBtn = document.querySelector('.button');
//     const popup = document.getElementById('popup');
//     const closeBtn = document.querySelector('.close-btn');

//     // Open popup when Learn More is clicked
//     learnMoreBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         popup.classList.add('show');
//     });

//     // Close popup when X is clicked
//     closeBtn.addEventListener('click', function() {
//         popup.classList.remove('show');
//     });

//     // Close popup when clicking outside
//     window.addEventListener('click', function(e) {
//         if (e.target === popup) {
//             popup.classList.remove('show');
//         }
//     });

//     // Close popup when pressing ESC key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && popup.classList.contains('show')) {
//             popup.classList.remove('show');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.querySelector('.button');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    const crossBtn = document.querySelector('.cross-btn');

    // Open popup when Learn More is clicked
    learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.classList.add('show');
    });

    // Close popup when Close button is clicked
    closeButton.addEventListener('click', function() {
        popup.classList.remove('show');
    });

    // Close popup when cross is clicked
    crossBtn.addEventListener('click', function() {
        popup.classList.remove('show');
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });

    // Close popup when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
    });
});

// Timeline Data
const timelineData = {
    zomato: {
        title: "Zomato (2023-2024)",
        details: [
            "Executed A/B testing on curbing new user benefits, leading to a 2% increase in monthly user retention.",
            "Performed city-level root cause analysis on new user acquisition using SQL, identified market saturation, and reduced marketing spending by 36% in high-penetrated areas.",
            "Developed strategies to detect users creating multiple accounts to exploit first-order benefits using Python and SQL.",
            "Identified campaign spillover to non-targeted cities on Meta using Advanced Analytics."
        ]
    },
    merilytics: {
        title: "Merilytics (2023)",
        details: [
            "Developed expense model in Excel using macros to provide client organizations with greater visibility of monthly expense variance.",
            "Implemented comprehensive 5-year expense forecast into the model, allowing clients to plan and allocate resources effectively."
        ]
    },
    thorogood: {
        title: "Thorogood Associates (2022)",
        details: [
            "Collaborated with the marketing team to create analytical dashboards in Power BI, increasing customer engagement through LinkedIn by up to 18%.",
            "Optimized ETL process using Azure Data Factory and Azure Data Bricks to structure product invoice data and create dashboards in Power BI."
        ]
    }
};

// Timeline Interaction Logic
const timelineItems = document.querySelectorAll('.timeline-item');
const popup = document.querySelector('#timeline-popup');
const popupTitle = document.querySelector('#timeline-popup-title');
const popupText = document.querySelector('#timeline-popup-text');
const closeBtn = document.querySelector('.timeline-close-btn');

// Show Popup on Click
timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        const contentKey = item.getAttribute('data-content');
        const data = timelineData[contentKey];

        if (data) {
            popupTitle.textContent = data.title;
            popupText.innerHTML = data.details.map(detail => `<li>${detail}</li>`).join('');
            popup.style.display = 'block';
        }
    });
});

// Close Popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
