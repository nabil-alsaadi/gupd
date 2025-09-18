(function ($) {
	"use strict";
	// Preloader 
	jQuery(window).on('load', function () {
		$(".preloader").delay(1600).fadeOut("slow");
	});

	document.addEventListener('DOMContentLoaded', function () {
		// Check if .sidebar-button exists
		const sidebarButton = document.querySelector('.sidebar-button');
		const mainMenu = document.querySelector('.main-menu');
	
		if (sidebarButton && mainMenu) {
			// jQuery code for the sidebar button
			$('.sidebar-button').on("click", function () {
				$(this).toggleClass('active');
			});
	
			// Vanilla JS code for toggling the main menu
			sidebarButton.addEventListener('click', () => {
				mainMenu.classList.toggle('show-menu');
			});
	
			// jQuery code for closing the menu
			$('.menu-close-btn').on("click", function () {
				mainMenu.classList.remove('show-menu');
			});
		}
	});


	// Sidebar 
	$('.sidebar-btn').on("click", function () {
		$('.sidebar-area').addClass('active');
	});
	$('.sidebar-menu-close').on("click", function () {
		$('.sidebar-area').removeClass('active');
	});

	jQuery('.dropdown-icon').on('click', function () {
		jQuery(this).toggleClass('active').next('ul').slideToggle();
		jQuery(this).parent().siblings().children('ul').slideUp();
		jQuery(this).parent().siblings().children('.active').removeClass('active');
	});
	jQuery('.dropdown-icon2').on('click', function () {
		jQuery(this).toggleClass('active').next('.submenu-list').slideToggle();
		jQuery(this).parent().siblings().children('.submenu-list').slideUp();
		jQuery(this).parent().siblings().children('.active').removeClass('active');
	});	
	
	// sticky header
	window.addEventListener('scroll', function () {
		const header = document.querySelector('.header-area');
		if (header) {
			header.classList.toggle("sticky", window.scrollY > 50);
		}
	});
	

	// sidebar
	$('.right-sidebar-button').on("click", function () {
		$('.right-sidebar-menu').addClass('show-right-menu');
	});
	$('.right-sidebar-close-btn').on("click", function () {
		$('.right-sidebar-menu').removeClass('show-right-menu');
	});

	$('.menu-btn').on("click", function () {
        $('.sidebar-menu').addClass('active');
    });
	$('.sidebar-menu-close').on("click", function () {
        $('.sidebar-menu').removeClass('active');
    });

	// Menu Text Animation
	document.querySelectorAll('.main-menu > li > a').forEach(button => button.innerHTML = '<div class="menu-text"><span>' + button.textContent.split('').join('</span><span>') + '</span></div>');

	setTimeout(() => {
	var menu_text = document.querySelectorAll(".menu-text span")
	menu_text.forEach((item) => {
		var font_sizes = window.getComputedStyle(item, null);
		let font_size = font_sizes.getPropertyValue("font-size");
		let size_in_number = parseInt(font_size.replace("px", ""));
		let new_size = parseInt(size_in_number / 3)
		new_size = new_size + "px"
		if (item.innerHTML == " ") {
		item.style.width = new_size
		}
	})
	}, 1000)

	//Counter up
	$('.counter').counterUp({
		delay: 10,
		time: 1500
	});

	const progressBar = document.getElementById("progressbar");
	progressBar.style.height = 1 + "%";

	window.onscroll = () => {
		const scroll = document.documentElement.scrollTop;
		const height =
			document.documentElement.scrollHeight - document.documentElement.clientHeight;
		let scrolled = (scroll / height) * 100;

		if (scrolled <= 1) {
			progressBar.style.height = 1 + "%";
		} else if (scrolled >= 2 && scrolled <= 99.9) {
			progressBar.style.height = scrolled + "%";
		} else if (scrolled === 100) {
			progressBar.style.height = scrolled + "%";
		}
	};
	// niceSelect
	$('select').niceSelect();
	
	// Home1 Banner Slider
	var swiper = new Swiper(".home1-banner-slider", {
		slidesPerView: 1,
		speed: 1500,
		effect: 'fade',
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		},
	});
	// Home1 project Slider
	var swiper = new Swiper(".home1-project-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".project-slider-next",
			prevEl: ".project-slider-prev",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
		  },
		  992: {
			slidesPerView: 2.7,
		  },
		  1200: {
			slidesPerView: 3.7,
		  },
		  1400: {
			slidesPerView: 3.5,
		  },
		},
	});
	// Home1 Team Slider
	var swiper = new Swiper(".home1-team-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".team-slider-next",
			prevEl: ".team-slider-prev",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 3,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 4,
		  },
		  1400: {
			slidesPerView: 4,
		  },
		},
	});
	// Home1 Blog Slider
	var swiper = new Swiper(".home1-blog-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".blog-slider-next",
			prevEl: ".blog-slider-prev",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 2,
		  },
		  1200: {
			slidesPerView: 2,
		  },
		  1400: {
			slidesPerView: 2,
		  },
		},
	});
	// Home1 Testimonial Slider
	var swiper = new Swiper(".home1-testimonial-slider", {
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 2000,
		effect: 'fade',             // Use the fade effect
		fadeEffect: {
		  crossFade: true           // Enable cross-fade transition
		},
		autoplay: {
			delay: 3000, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".testimonial-slider-next",
			prevEl: ".testimonial-slider-prev",
		},
	});
	// Home2 Blog Slider
	var swiper = new Swiper(".home2-blog-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 3,
		  },
		  1400: {
			slidesPerView: 3,
		  },
		},
	});
	// Home3 Process Slider
	var swiper = new Swiper(".home3-process-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 4,
			spaceBetween: 25,
		  },
		  1400: {
			slidesPerView: 4,
			spaceBetween: 30,
		  },
		},
	});
	// Home3 Team Slider
	var swiper = new Swiper(".home3-team-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 3,
		  },
		  1400: {
			slidesPerView: 3,
		  },
		},
	});
	var swiper = new Swiper(".gallery-slider", {
		speed: 1500,
		spaceBetween: 0,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},

		breakpoints: {
			280: {
				slidesPerView: 2,
			},
			386: {
				slidesPerView: 2,
			},
			576: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 4,
			},
			1200: {
				slidesPerView: 5,
			},
			1400: {
				slidesPerView: 5,
			},
		},
	});
	// Home4 Project Slider
	var swiper = new Swiper(".home4-project-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		// autoplay: {
		// 	delay: 2500, // Autoplay duration in milliseconds
		// 	disableOnInteraction: false,
		// },
		navigation: {
			nextEl: ".project-slider-next",
			prevEl: ".project-slider-prev",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 2,
		  },
		  1200: {
			slidesPerView: 2.3,
		  },
		  1400: {
			slidesPerView: 2.7,
		  },
		},
	});

	var swiper = new Swiper(".home4-testimonial-img-slider", {
		spaceBetween: 10,
		slidesPerView: 1,
		freeMode: true,
		watchSlidesProgress: true,
		allowTouchMove: false, 
		speed: 2000,
		effect: 'fade',             // Use the fade effect
		fadeEffect: {
		  crossFade: true           // Enable cross-fade transition
		},
		
		// autoplay: {
		// 	delay: 3000, // Autoplay duration in milliseconds
		// 	disableOnInteraction: false,
		// },
	});
	var swiper2 = new Swiper(".home4-testimonial-content-slider", {
		spaceBetween: 10,
		speed: 2000,
		effect: 'fade',             // Use the fade effect
		fadeEffect: {
			crossFade: true           // Enable cross-fade transition
		},
		// autoplay: {
		// 	delay: 3000, // Autoplay duration in milliseconds
		// 	disableOnInteraction: false,
		// },
		navigation: {
			nextEl: ".home4-testimonial-next",
			prevEl: ".home4-testimonial-prev",
		},
		thumbs: {
			swiper: swiper,
		},
	});
	var swiper = new Swiper(".home5-banner-slider", {
		slidesPerView: 1,
		speed: 1500,
		effect: 'fade',
		fadeEffect: {
			crossFade: true           // Enable cross-fade transition
		},
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		},
	});
	// Home5 Service Slider
	var swiper = new Swiper(".home5-service-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination1",
			clickable: true,
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 4,
			spaceBetween: 15,
		  },
		  1400: {
			slidesPerView: 4,
		  },
		},
	});
	var swiper = new Swiper(".home5-testimonial-slider", {
		spaceBetween: 10,
		speed: 2000,
		effect: 'fade',             // Use the fade effect
		fadeEffect: {
			crossFade: true           // Enable cross-fade transition
		},
		autoplay: {
			delay: 3000, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".home4-testimonial-next",
			prevEl: ".home4-testimonial-prev",
		},
	});
	var swiper = new Swiper(".home6-banner-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 0,
		autoplay: {
			delay: 3000, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".next-1",
			prevEl: ".prev-1",
		},

		breakpoints: {
			280: {
				slidesPerView: 1,
			},
			386: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 2,
			},
			1400: {
				slidesPerView: 2,
			},
		}
	});
	// Home6 Process Slider
	var swiper = new Swiper(".home6-process-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		pagination: {
			el: ".progress-pagination",
			type: "progressbar",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  1200: {
			slidesPerView: 2,
		  },
		  1400: {
			slidesPerView: 2,
		  },
		},
	});
	// Project Single Slider
	var swiper = new Swiper(".project-single-slider", {
		slidesPerView: 1,
		speed: 1500,
		effect: 'fade',
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".project-single-next",
			prevEl: ".project-single-prev",
		},
	});
	// Related Property Slider
	var swiper = new Swiper(".related-property-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: {
			delay: 2500, // Autoplay duration in milliseconds
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".related-property-slider-next",
			prevEl: ".related-property-slider-prev",
		},
		breakpoints: {
		  280: {
			slidesPerView: 1,
		  },
		  386: {
			slidesPerView: 1,
		  },
		  576: {
			slidesPerView: 1,
			spaceBetween: 15,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 15,
		  },
		  992: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 3,
		  },
		  1400: {
			slidesPerView: 3,
		  },
		},
	});
	
	const serviceImgItem = document.querySelectorAll(".award-wrap .single-award");

	function __followImageCursor(event, serviceImgItem) {
	  const contentBox = serviceImgItem.getBoundingClientRect();
	  const dx = event.clientX - contentBox.x;
	  const dy = event.clientY - contentBox.y;
	  serviceImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px) rotate(12deg)`;
	}
  
	serviceImgItem.forEach((item, i) => {
	  item.addEventListener("mousemove", (event) => {
		setInterval(__followImageCursor(event, item), 100);
	  });
	});

	const serviceImgItem2 = document.querySelectorAll(".award-wrap2 .single-award");

	function __followImageCursor2(event, serviceImgItem2) {
	  const contentBox = serviceImgItem2.getBoundingClientRect();
	  const dx = event.clientX - contentBox.x;
	  const dy = event.clientY - contentBox.y;
	  serviceImgItem2.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
	}
  
	serviceImgItem2.forEach((item, i) => {
	  item.addEventListener("mousemove", (event) => {
		setInterval(__followImageCursor2(event, item), 100);
	  });
	});


	var dragging = false;
    var m = document.getElementById("imageHandle");
    var r = document.getElementById("imageReveal");
    var offsetX = 0;
    var offsetY = 0;
    var dragging = false;

    if (m !== null && r !== null) {
        initialize();

        // Add both mouse and touch event listeners
        m.addEventListener("mousedown", down, { passive: false });
        m.addEventListener("touchstart", down, { passive: false });

        function down(event) {
            event.preventDefault();
            dragging = true;

            // Remove transition effects during drag
            m.style.transition = "none";
            r.style.transition = "none";

            // Set grabbing cursor style
            document.body.style.cursor = "grabbing";
            m.style.cursor = "grabbing";

            // Calculate offsetX and offsetY for smooth dragging
            if (window.innerWidth > 767) {
                offsetX = (event.clientX || event.touches[0].clientX) - m.getBoundingClientRect().left - 18;
            } else {
                offsetY = (event.clientY || event.touches[0].clientY) - m.getBoundingClientRect().top;
            }

            // Trigger the initial move to prevent jump
            doMoving(event);
        }

        // Add mouse and touch move event listeners
        window.addEventListener("mousemove", move, { passive: false });
        window.addEventListener("touchmove", move, { passive: false });

        function move(event) {
            if (dragging) {
                event.preventDefault();
                doMoving(event);
            }
        }

        function doMoving(event) {
            // Get correct clientX and clientY for mouse and touch events
            var clientX = event.clientX || (event.touches && event.touches[0].clientX);
            var clientY = event.clientY || (event.touches && event.touches[0].clientY);

            if (window.innerWidth > 767) {
                // For desktop layout (horizontal reveal)
                var x = clientX - offsetX;
                
                // Adjust boundaries to prevent gaps or overflow
                x = Math.max(0, Math.min(x, window.innerWidth - 2));
                
                // Set handle position and clip path
                m.style.left = x + "px";
                m.style.top = "50%";
                r.style.clipPath = `inset(0 0 0 ${x}px)`;
            } else {
                // For mobile layout (vertical reveal)
                var client = r.getBoundingClientRect();
                var y = clientY - offsetY;
                
                // Ensure the handle stays within the top and bottom boundaries
                y = Math.max(0, Math.min(y, client.height));
                
                // Set handle position and clip path
                m.style.top = y + "px";
                m.style.left = "50%";
                r.style.clipPath = `inset(0 0 ${client.height - y}px 0)`;
            }
        }

        // Initial setup for handle and reveal position
        function initialize() {
            if (window.innerWidth > 767) {
                // Desktop initial position (centered horizontally)
                var initialX = window.innerWidth / 2;
                m.style.left = initialX + "px";
                m.style.top = "50%";
                r.style.clipPath = `inset(0 0 0 ${initialX}px)`;
            } else {
                // Mobile initial position (centered vertically)
                var client = r.getBoundingClientRect();
                var initialY = client.height / 2;
                m.style.top = initialY + "px";
                m.style.left = "50%";
                r.style.clipPath = `inset(0 0 ${client.height - initialY}px 0)`;
            }
        }

        // Mouseup and touchend events to reset dragging state
        window.addEventListener("mouseup", resetDragState);
        window.addEventListener("touchend", resetDragState);

        function resetDragState() {
            document.body.style.cursor = "";
            m.style.cursor = "";
            dragging = false;
        }
    }

	//wow js 
    jQuery(window).on('load', function () {
        new WOW().init();
        window.wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            offset: 80
        })
        window.wow.init();
    });

	$(".service-list .single-service").on("mouseenter", function (e) {
		// // Get the index of the hovered content list item
		var index = $(this).index();
		// Remove the 'active' class from all image list items
		$(".service-img-group li").removeClass("active");
		// Add the 'active' class to the corresponding image list item
		$(".service-img-group li:eq(" + index + ")").addClass("active");
	});

	$(document).ready(function() {
		if ($(".container1").length) {
			$(".container1").twentytwenty();
		}
	});
	$(document).ready(function() {
		if ($("#container2").length) {
			$("#container2").twentytwenty();
		}
	});

	//Quantity Increment
	$(".quantity__minus").on("click", function (e) {
		e.preventDefault();
		var input = $(this).siblings(".quantity__input");
		var value = parseInt(input.val(),10);
		if (value > 1) {
			value--;
		}
		input.val(value.toString().padStart(2, "0"));
	});
	$(".quantity__plus").on("click", function (e) {
		e.preventDefault();
		var input = $(this).siblings(".quantity__input");
		var value = parseInt(input.val(),10);
		value++;
		input.val(value.toString().padStart(2, "0"));
	});

	//Select wrap
	$(".select-wrap").on("click", function () {
		$(this).addClass("selected").siblings().removeClass("selected");
	});

	//Cart Page Quantity button toggle
	$(".qty-btn").on("click", function (e) {
		e.stopPropagation();
		// Toggle "active" class for the current quantity button and its related elements
		$(this).next(".quantity-area").toggleClass("active");
	
		// Remove "active" class from other quantity buttons and related elements
		$(".quantity-area")
			.not($(this).next(".quantity-area"))
			.removeClass("active");
		});
		$(document).on("click", function (e) {
		if (
			!$(e.target).closest(".quantity-area")
			.length
		) {
			// Remove "active" class from all quantity buttons and related elements
			$(".quantity-area").removeClass("active");
		}
	});

	///Marquee
	const marquee = document.querySelectorAll(".marquee_text");
	if (marquee) {
		$(".marquee_text").marquee({
			direction: "left",
			duration: 25000,
			gap: 50,
			delayBeforeStart: 0,
			duplicated: true,
			startVisible: true,
		});
	}

	if ($("body").not(".is-mobile").hasClass("tt-magic-cursor")) {
		if ($(window).width() > 1024) {
		  gsap.config({
			nullTargetWarn: false,
			trialWarn: false,
		  });
		  $(".magnetic-item").wrap('<div class="magnetic-wrap"></div>');
	
		  if ($("a.magnetic-item").length) {
			$("a.magnetic-item").addClass("not-hide-cursor");
		  }
	
		  var $mouse = { x: 0, y: 0 }; // Cursor position
		  var $pos = { x: 0, y: 0 }; // Cursor position
		  var $ratio = 0.15; // delay follow cursor
		  var $active = false;
		  var $ball = $("#ball");
	
		  var $ballWidth = 20; // Ball default width
		  var $ballHeight = 20; // Ball default height
		  var $ballOpacity = 0.5; // Ball default opacity
		  var $ballBorderWidth = 2; // Ball default border width
	
		  gsap.set($ball, {
			// scale from middle and style ball
			xPercent: -50,
			yPercent: -50,
			width: $ballWidth,
			height: $ballHeight,
			borderWidth: $ballBorderWidth,
			opacity: $ballOpacity,
		  });
	
		  document.addEventListener("mousemove", mouseMove);
	
		  function mouseMove(e) {
			$mouse.x = e.clientX;
			$mouse.y = e.clientY;
		  }
	
		  gsap.ticker.add(updatePosition);
	
		  function updatePosition() {
			if (!$active) {
			  $pos.x += ($mouse.x - $pos.x) * $ratio;
			  $pos.y += ($mouse.y - $pos.y) * $ratio;
	
			  gsap.set($ball, { x: $pos.x, y: $pos.y });
			}
		  }
	
		  $(".magnetic-wrap").mousemove(function (e) {
			parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
			callParallax(e, this);
		  });
	
		  function callParallax(e, parent) {
			parallaxIt(e, parent, parent.querySelector(".magnetic-item"), 25); // magnetic area = higher number is more attractive
		  }
	
		  function parallaxIt(e, parent, target, movement) {
			var boundingRect = parent.getBoundingClientRect();
			var relX = e.clientX - boundingRect.left;
			var relY = e.clientY - boundingRect.top;
	
			gsap.to(target, {
			  duration: 0.3,
			  x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
			  y:
				((relY - boundingRect.height / 2) / boundingRect.height) * movement,
			  ease: Power2.easeOut,
			});
		  }
	
		  function parallaxCursor(e, parent, movement) {
			var rect = parent.getBoundingClientRect();
			var relX = e.clientX - rect.left;
			var relY = e.clientY - rect.top;
			$pos.x =
			  rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
			$pos.y =
			  rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
			gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
		  }
	
		  // Magic cursor behavior
		  // ======================
	
		  // Magnetic item hover.
		  $(".magnetic-wrap")
			.on("mouseenter mouseover", function (e) {
			  $ball.addClass("magnetic-active");
			  gsap.to($ball, { duration: 0.3, width: 70, height: 70, opacity: 1 });
			  $active = true;
			})
			.on("mouseleave", function (e) {
			  $ball.removeClass("magnetic-active");
			  gsap.to($ball, {
				duration: 0.3,
				width: $ballWidth,
				height: $ballHeight,
				opacity: $ballOpacity,
			  });
			  gsap.to(this.querySelector(".magnetic-item"), {
				duration: 0.3,
				x: 0,
				y: 0,
				clearProps: "all",
			  });
			  $active = false;
			});
	
		  // Alternative cursor style on hover.
		  $(
			".cursor-alter, .tt-main-menu-list > li > a, .tt-main-menu-list > li > .tt-submenu-trigger > a"
		  )
			.not(".magnetic-item") // omit from selection.
			.on("mouseenter", function () {
			  gsap.to($ball, {
				duration: 0.3,
				borderWidth: 0,
				opacity: 0.2,
				backgroundColor: "#CCC",
				width: "90px",
				height: "90px",
			  });
			})
			.on("mouseleave", function () {
			  gsap.to($ball, {
				duration: 0.3,
				borderWidth: $ballBorderWidth,
				opacity: $ballOpacity,
				backgroundColor: "transparent",
				width: $ballWidth,
				height: $ballHeight,
				clearProps: "backgroundColor",
			  });
			});	
		
		  // Cursor view on hover (data attribute "data-cursor="...").
		  $("[data-cursor]").each(function () {
			$(this)
			  .on("mouseenter", function () {
				$ball
				  .addClass("ball-view")
				  .append('<div class="ball-view-inner"></div>');
				$(".ball-view-inner").append($(this).attr("data-cursor"));
				gsap.to($ball, {
				  duration: 0.3,
				  yPercent: -75,
				  width: 82,
				  height: 82,
				  opacity: 1,
				  borderWidth: 0,
				});
				gsap.to(".ball-view-inner", {
				  duration: 0.3,
				  scale: 1,
				  autoAlpha: 1,
				});
			  })
			  .on("mouseleave", function () {
				gsap.to($ball, {
				  duration: 0.3,
				  yPercent: -50,
				  width: $ballWidth,
				  height: $ballHeight,
				  opacity: $ballOpacity,
				  borderWidth: $ballBorderWidth,
				});
				$ball.removeClass("ball-view").find(".ball-view-inner").remove();
			  });
			$(this).addClass("not-hide-cursor");
		  });
	
		  // Cursor drag on hover (class "cursor-drag"). For Swiper sliders.
		  $(".swiper").each(function () {
			if ($(this).parent().attr("data-simulate-touch") === "true") {
			  if ($(this).parent().hasClass("cursor-drag")) {
				$(this)
				  .on("mouseenter", function () {
					$ball.append('<div class="ball-drag"></div>');
					gsap.to($ball, {
					  duration: 0.3,
					  width: 60,
					  height: 60,
					  opacity: 1,
					});
				  })
				  .on("mouseleave", function () {
					$ball.find(".ball-drag").remove();
					gsap.to($ball, {
					  duration: 0.3,
					  width: $ballWidth,
					  height: $ballHeight,
					  opacity: $ballOpacity,
					});
				  });
				$(this).addClass("not-hide-cursor");
	
				// Ignore "data-cursor" on hover.
				$(this)
				  .find("[data-cursor]")
				  .on("mouseenter mouseover", function () {
					$ball.find(".ball-drag").remove();
					return false;
				  })
				  .on("mouseleave", function () {
					$ball.append('<div class="ball-drag"></div>');
					gsap.to($ball, {
					  duration: 0.3,
					  width: 60,
					  height: 60,
					  opacity: 1,
					});
				  });
			  }
			}
		  });
	
		  // Cursor drag on mouse down / click and hold effect (class "cursor-drag-mouse-down"). For Swiper sliders.
		  $(".swiper").each(function () {
			if ($(this).parent().attr("data-simulate-touch") === "true") {
			  if ($(this).parent().hasClass("cursor-drag-mouse-down")) {
				$(this)
				  .on("mousedown pointerdown", function (e) {
					if (e.which === 1) {
					  // Affects the left mouse button only!
					  gsap.to($ball, {
						duration: 0.2,
						width: 60,
						height: 60,
						opacity: 1,
					  });
					  $ball.append('<div class="ball-drag"></div>');
					}
				  })
				  .on("mouseup pointerup", function () {
					$ball.find(".ball-drag").remove();
					if ($(this).find("[data-cursor]:hover").length) {
					} else {
					  gsap.to($ball, {
						duration: 0.2,
						width: $ballWidth,
						height: $ballHeight,
						opacity: $ballOpacity,
					  });
					}
				  })
				  .on("mouseleave", function () {
					$ball.find(".ball-drag").remove();
					gsap.to($ball, {
					  duration: 0.2,
					  width: $ballWidth,
					  height: $ballHeight,
					  opacity: $ballOpacity,
					});
				  });
	
				// Ignore "data-cursor" on mousedown.
				$(this)
				  .find("[data-cursor]")
				  .on("mousedown pointerdown", function () {
					return false;
				  });
	
				// Ignore "data-cursor" on hover.
				$(this)
				  .find("[data-cursor]")
				  .on("mouseenter mouseover", function () {
					$ball.find(".ball-drag").remove();
					return false;
				  });
			  }
			}
		  });
	
		  // Cursor close on hover.
		  $(".cursor-close").each(function () {
			$(this).addClass("ball-close-enabled");
			$(this)
			  .on("mouseenter", function () {
				$ball.addClass("ball-close-enabled");
				$ball.append('<div class="ball-close">Close</div>');
				gsap.to($ball, {
				  duration: 0.3,
				  yPercent: -75,
				  width: 80,
				  height: 80,
				  opacity: 1,
				});
				gsap.from(".ball-close", { duration: 0.3, scale: 0, autoAlpha: 0 });
			  })
			  .on("mouseleave click", function () {
				$ball.removeClass("ball-close-enabled");
				gsap.to($ball, {
				  duration: 0.3,
				  yPercent: -50,
				  width: $ballWidth,
				  height: $ballHeight,
				  opacity: $ballOpacity,
				});
				$ball.find(".ball-close").remove();
			  });
	
			// Hover on "cursor-close" inner elements.
			$(
			  ".cursor-close a, .cursor-close button, .cursor-close .tt-btn, .cursor-close .hide-cursor"
			)
			  .not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			  .on("mouseenter", function () {
				$ball.removeClass("ball-close-enabled");
			  })
			  .on("mouseleave", function () {
				$ball.addClass("ball-close-enabled");
			  });
		  });
	
		  // ================================================================
		  // Scroll between anchors
		  // ================================================================
	
		  $('a[href^="#"]')
			.not('[href$="#"]') // omit from selection
			.not('[href$="#0"]') // omit from selection
			.on("click", function () {
			  var target = this.hash;
	
			  // If fixed header position enabled.
			  if ($("#tt-header").hasClass("tt-header-fixed")) {
				var $offset = $("#tt-header").height();
			  } else {
				var $offset = 0;
			  }
	
			  // You can use data attribute (for example: data-offset="100") to set top offset in HTML markup if needed.
			  if ($(this).data("offset") != undefined)
				$offset = $(this).data("offset");
	
			  
			  return false;
			});
	
		 
		  // Show/hide magic cursor
		  // =======================
	
		  // Hide on hover.
		  $(
			"a, button, .tt-btn, .tt-form-control, .tt-form-radio, .tt-form-check, .hide-cursor"
		  ) // class "hide-cursor" is for global use.
			.not(".not-hide-cursor") // omit from selection (class "not-hide-cursor" is for global use).
			.not(".cursor-alter") // omit from selection
			.not(".tt-main-menu-list > li > a") // omit from selection
			.not(".tt-main-menu-list > li > .tt-submenu-trigger > a") // omit from selection
			.on("mouseenter", function () {
			  gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
			})
			.on("mouseleave", function () {
			  gsap.to($ball, { duration: 0.3, scale: 1, opacity: $ballOpacity });
			});
	
		  // Hide on click.
		  $("a")
			.not('[target="_blank"]') // omit from selection.
			.not('[href^="#"]') // omit from selection.
			.not('[href^="mailto"]') // omit from selection.
			.not('[href^="tel"]') // omit from selection.
			.not(".lg-trigger") // omit from selection.
			.not(".video-player") // omit from selection.
			.not(".tt-btn-disabled") // omit from selection.
			.on("click", function () {
			  gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

		  // Show/hide on document leave/enter.
		  $(document)
			.on("mouseleave", function () {
			  gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
			})
			.on("mouseenter", function () {
			  gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
			});
	
		  // Show as the mouse moves.
		  $(document).mousemove(function () {
			gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
	   	  });
		}
	  }
	

	// //circular-text
	// document.addEventListener("DOMContentLoaded", function () {
	// 	const circularText = document.querySelector(".circular-text .text");
	
	// 	// Check if circularText element exists
	// 	if (circularText) {
	// 		const text = circularText.innerText;
	// 		circularText.innerText = ""; // Clear the original text
	
	// 		const radius = 90; // Adjust the radius for spacing
	// 		const angleIncrement = 360 / text.length; // Angle between each character
	
	// 		text.split("").forEach((char, index) => {
	// 			const span = document.createElement("span");
	// 			span.innerText = char;
	// 			span.style.letterSpacing = '2px'; // Add letter spacing
	// 			const angle = angleIncrement * index - 90; // Starting angle at the top (12 o'clock)
	
	// 			// Calculate (x, y) position for each letter
	// 			const x = radius * Math.cos((angle * Math.PI) / 180);
	// 			const y = radius * Math.sin((angle * Math.PI) / 180);
	
	// 			// Position each letter and rotate it to keep it upright
	// 			span.style.position = "absolute";
	// 			span.style.left = "50%";
	// 			span.style.top = "50%";
	// 			span.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
	// 			span.style.transformOrigin = "0 0"; // Keep rotation point at the center of each character
	// 			circularText.appendChild(span);
	// 		});
	
	// 		// Optional: start rotating the text
	// 		circularText.style.animation = "rotate-circle 10s linear infinite";
	// 	}
	// });
	
	 
	 // Title Animation
	 let splitTitleLines = gsap.utils.toArray(".text-animation");

	 splitTitleLines.forEach((splitTextLine) => {
	   const tl2 = gsap.timeline({
		 scrollTrigger: {
		   trigger: splitTextLine,
		   start: "top 90%",
		   end: "bottom 60%",
		   scrub: false,
		   markers: false,
		   toggleActions: "play none none none",
		 },
	   });
   
	   const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
	   gsap.set(splitTextLine, { perspective: 400 });
	   itemSplitted.split({ type: "lines" });
	   tl2.from(itemSplitted.lines, {
		 duration: 1,
		 delay: 0.3,
		 opacity: 0,
		 rotationX: -80,
		 force3D: true,
		 transformOrigin: "top center -50",
		 stagger: 0.1,
	   });
	 });

    //Project Info Flow
	const infoflow1TextItem = document.querySelectorAll(".project-info-flow-card");
	function followImageCursor(event, infoflow1TextItem) {
	const contentBox = infoflow1TextItem.getBoundingClientRect();
	const dx = event.clientX - contentBox.x;
	const dy = event.clientY - contentBox.y;
	infoflow1TextItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
	}

	infoflow1TextItem.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			setInterval(followImageCursor(event, item), 100);
		});
	});

	// Mouse leave event for indicator-area div
	// $('.indicator-area').on("mouseleave", function () {
	// 	// Remove active class from all li elements except the first child
	// 	$('.indicator-area ul li:not(:first-child)').removeClass('active');
	// 	// Add active class to the first child
	// 	$('.indicator-area ul li:first-child').addClass('active');
	// });
	// // Hover event for li elements
	// $('.indicator-area ul li').on(
	// 	{
	// 		mouseenter: function (){
	// 			// Add active class to the current li and remove from siblings
	// 		$(this).addClass('active').siblings().removeClass('active');
	// 		}
	// 	}
	// );

	// Select all list items
	const listItems = document.querySelectorAll('.indicator-area ul li');

	// Function to add active class on hover
	listItems.forEach(item => {
		item.addEventListener('mouseenter', () => {
			// Remove active class from all list items
			listItems.forEach(li => li.classList.remove('active'));

			// Add active class to the hovered item
			item.classList.add('active');
		});
	});


	 // 27. Text Animation
	 let splitTextLines = gsap.utils.toArray(".text-animation p");
   
	 splitTextLines.forEach((splitTextLine) => {
	   const tl3 = gsap.timeline({
		 scrollTrigger: {
		   trigger: splitTextLine,
		   start: "top 90%",
		   duration: 2,
		   end: "bottom 60%",
		   scrub: false,
		   markers: false,
		   toggleActions: "play none none none",
		 },
	   });
   
	   const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
	   gsap.set(splitTextLine, { perspective: 400 });
	   itemSplitted.split({ type: "lines" });
	   tl3.from(itemSplitted.lines, {
		 duration: 1,
		 delay: 0.5,
		 opacity: 0,
		 rotationX: -80,
		 force3D: true,
		 transformOrigin: "top center -50",
		 stagger: 0.1,
	   });
	 });
	
	// All Buttons
	let arr1 = gsap.utils.toArray("#btn_wrapper");
	let arr2 = gsap.utils.toArray(".btn_wrapper");
	const all_buttons = arr1.concat(arr2);

	all_buttons.forEach((btn) => {
	if (!btn.classList.contains("banner-btn")) {
		gsap.from(btn, {
		scrollTrigger: {
			trigger: btn,
			start: "top center+=150",
			markers: false,
		},
		opacity: 0,
		y: -70,
		ease: "bounce",
		duration: 1.5,
		});
	}
	});

	let arr3 = gsap.utils.toArray("#bounce_up");
	let arr4 = gsap.utils.toArray(".bounce_up");
	const all_buttons2 = arr3.concat(arr4);

	all_buttons2.forEach((btn) => {
	if (!btn.classList.contains("banner-btn")) {
		gsap.from(btn, {
		scrollTrigger: {
			trigger: btn,
			start: "top center+=450",
			markers: false,
		},
		opacity: 0,
		y: 50,
		ease: "bounce",
		duration: 1.5,
		});
	}
	});

	let arr5 = gsap.utils.toArray("#fade_left");
	let arr6 = gsap.utils.toArray(".fade_left");
	const all_buttons3 = arr5.concat(arr6);

	all_buttons3.forEach((btn) => {
	if (!btn.classList.contains("banner-btn")) {
		gsap.from(btn, {
		scrollTrigger: {
			trigger: btn,
			start: "top center+=150",
			markers: false,
		},
		opacity: 0,
		x: -70,
		ease: "fadeLeft",
		duration: 1.5,
		});
	}
	});

	let arr7 = gsap.utils.toArray("#fade_right");
	let arr8 = gsap.utils.toArray(".fade_right");
	const all_buttons4 = arr7.concat(arr8);

	all_buttons4.forEach((btn) => {
	if (!btn.classList.contains("banner-btn")) {
		gsap.from(btn, {
		scrollTrigger: {
			trigger: btn,
			start: "top center+=150",
			markers: false,
		},
		opacity: 0,
		x: 70,
		ease: "fadeRight",
		duration: 1.5,
		});
	}
	});

	let arr9 = gsap.utils.toArray("#fade_Up");
	let arr10 = gsap.utils.toArray(".fade_Up");
	const all_buttons5 = arr9.concat(arr10);

	all_buttons5.forEach((btn) => {
	if (!btn.classList.contains("banner-btn")) {
		gsap.from(btn, {
		scrollTrigger: {
			trigger: btn,
			start: "top center+=150",
			markers: false,
		},
		opacity: 0,
		y: 70,
		ease: "fadeUp",
		duration: 1.5,
		});
	}
	});
	
	// Home3 Banner Hover
    $(".banner-hover").on("mouseenter", function() { // Changes the .image-holder's img src to the src defined in .list a's data attribute.
        var value=$(this).attr('data-src');
        document.getElementById("home6-banner-bg").style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%) ,url('"+value+"')";
    });

	// Payment Method
	$(function() {
		$('.choose-payment-method ul li').on('click', function() {
		$('.choose-payment-method ul li').removeClass('active'); // Remove active class from all list items
		if ($(this).hasClass('stripe')) {
			$('#StripePayment').show();
			$('#OfflinePayment').hide();
			$(this).addClass('active'); // Add active class to the clicked list item
		}
		else if ($(this).hasClass('paypal')) {
			$('#OfflinePayment').hide();
			$('#StripePayment').hide();
			$(this).addClass('active'); // Add active class to the clicked list item
		}
		else if ($(this).hasClass('offline')) {
			$('#OfflinePayment').show();
			$('#StripePayment').hide();
			$(this).addClass('active'); // Add active class to the clicked list item
		}
		else {
			$('#StripePayment').hide();
			$('#OfflinePayment').hide();
		}
		});
	});
	


	//Scroll Down Button
	const scrollBtn = document.querySelector('#scroll-btn');
	if (scrollBtn) { 
		scrollBtn.addEventListener('click', function(e) {
			e.preventDefault();
			document.querySelector('#scroll-section').scrollIntoView({
				behavior: 'smooth'
			});
		});
	}
	const scrollBtn2 = document.querySelector('#scroll-btn2');
	if (scrollBtn2) { 
		scrollBtn2.addEventListener('click', function(e) {
			e.preventDefault();
			document.querySelector('#scroll-section2').scrollIntoView({
				behavior: 'smooth'
			});
		});
	}


	// Video Popup

	$('[data-fancybox="gallery"]').fancybox({
		buttons: [
			"close"
		],
		loop: false,
		protect: true
	});
	$('.video-player').fancybox({
		buttons: [
			"close"
		],
		loop: false,
		protect: true
	});



	// Get the height of the section between start and end triggers
	function initScrollAnimation() {
		const scrollSecTitle = document.querySelector(".scroll-sec-title");
		const scrollSecTitleEnd = document.querySelector(".scroll-sec-title-end");
	
		// Check if both elements exist before proceeding
		if (scrollSecTitle && scrollSecTitleEnd) {
		const start = scrollSecTitle.getBoundingClientRect().top;
		const end = scrollSecTitleEnd.getBoundingClientRect().top;
		const distance = end - start;
	
		const scScrollTl = gsap.timeline({
			scrollTrigger: {
			trigger: ".scroll-sec-title",
			start: "top 15%",
			endTrigger: ".scroll-sec-title-end",
			end: "top top",
			toggleActions: "restart pause reverse pause",
			scrub: 1,
			},
		});
	
		scScrollTl.to(".scroll-sec-title", {
			y: distance, // Use the calculated distance
			duration: 10, // Duration can be kept for scrub speed
			opacity: 0,
		});
		}
	}
	
	function handleResize() {
		if (window.innerWidth >= 991) {
		initScrollAnimation();
		} else {
		if (ScrollTrigger.getById("scScrollTl")) {
			ScrollTrigger.getById("scScrollTl").kill();
		}
		}
	}
	
	handleResize();
	window.addEventLis
  
	$(document).ready(function () {
		gsap.registerPlugin(ScrollTrigger);
	
		function combined_image_animation() {
			// Combined Reveal and Zoom-In Animation
			$(".image-reveal").each(function () {
				const imgElement = $(this).find("img");
	
				// Check if the element also has the zoom-in class
				const hasZoomEffect = $(this).hasClass("wcf--image-effect-zoom-in");
	
				// Set up GSAP timeline for reveal and zoom-in animation
				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: this,
						start: "top 75%",  // Adjust as needed
						toggleActions: "play none none none"
					}
				});
	
				// Reveal animation from the right
				timeline.from(imgElement, {
					xPercent: -100,  // Slide in from the right
					autoAlpha: 0,
					duration: 2.5,
					ease: "power2.out"
				});
	
				// If it has zoom effect, add zoom-in animation to the timeline
				if (hasZoomEffect) {
					timeline.fromTo(
						imgElement,
						{ scale: 1.3 },  // Start zoomed in
						{
							scale: 1.1,      // Zoom to normal size
							duration: 1.5,
							ease: "power2.out"
						},
						"<" // Start zoom effect simultaneously with the reveal
					);
				}
			});
		}
	
		combined_image_animation();
	});
	
	// document.addEventListener("DOMContentLoaded", function() {
	// 	// Ensure GSAP and ScrollTrigger are loaded
	// 	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
	// 		// Image animation function
	// 		function animateImage() {
	// 			var container = document.querySelector('.image-container');
	// 			var image = container.querySelector('img');
	
	// 			// Reveal animation
	// 			gsap.set(image, { autoAlpha: 1 }); // Set initial visibility
	// 			gsap
	// 			.timeline({
	// 				scrollTrigger: {
	// 				trigger: container,
	// 				start: "top 50%",
	// 				},
	// 			})
	// 			.from(container, 1.5, { xPercent: -100, ease: "power2.out" })
	// 			.from(image, 1.5, {
	// 				xPercent: 100,
	// 				scale: 1.3,
	// 				delay: -1.5,
	// 				ease: "power2.out",
	// 			});
	
	// 			// Scale animation on scroll
	// 			gsap.set(image, { scale: 1.3 });
	// 			gsap.to(image, {
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "top top",
	// 					scrub: true,
	// 				},
	// 				scale: 1,
	// 				ease: "power2.out"
	// 			});
	// 		}
	
	// 		// Run animation
	// 		animateImage();
	// 	} else {
	// 		console.error("GSAP or ScrollTrigger is not loaded.");
	// 	}
	// });

}(jQuery));