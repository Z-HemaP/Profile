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


document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add click event listeners to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const company = this.dataset.company;
            const popup = document.getElementById(`${company}-popup`);
            if (popup) {
                popup.classList.add('active');
            }
        });
    });

    // Close popup functions
    function closePopup(popup) {
        popup.classList.remove('active');
    }

    // Add event listeners to close buttons
    document.querySelectorAll('.close-btn, .close-button').forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup');
            closePopup(popup);
        });
    });

    // Close popup when clicking outside
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup(this);
            }
        });
    });

    // Close popup with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.popup.active');
            if (activePopup) {
                closePopup(activePopup);
            }
        }
    });

    // Optional: Add scroll animation for timeline items
    function checkScroll() {
        const timelineContainer = document.querySelector('.timeline-container');
        const containerPosition = timelineContainer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (containerPosition < screenPosition) {
            timelineContainer.classList.add('animate');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});