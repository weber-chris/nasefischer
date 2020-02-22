(function($) {
    "use strict"; 
    
    	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
        }
        function load_google_sheet() {
            let spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1M-Ocs-a9Ri_9u9-DH_GQNgnnhQRD8v31L2KGMS2blro/edit?usp=sharing';
            Tabletop.init({
                key: spreadsheet_url,
                callback: read_sheets,
                simpleSheet: false
            })
        }

        function create_table_cell(row_index, column_name, data){
            let td = document.createElement('td');
            td.appendChild(document.createTextNode( data[row_index][column_name])) ;
            return td 
        }
        function read_sheets(data) {
            let members = data.members.elements;
            let calendar = data.calendar.elements;

            let member_table = document.getElementById('member-table');
            for (let row_index in members){
                let tr = document.createElement('tr');
                tr.appendChild( create_table_cell(row_index, 'Name', members));
                tr.appendChild( create_table_cell(row_index, 'Strikes', members));
                tr.appendChild( create_table_cell(row_index, 'Fangzahl', members));
                member_table.appendChild(tr);
            }

            let calendar_table = document.getElementById('calendar-table');
            for (let row_index in calendar){
                let tr = document.createElement('tr');
                tr.appendChild( create_table_cell(row_index, 'Datum', calendar));
                tr.appendChild( create_table_cell(row_index, 'Wo', calendar));
                tr.appendChild( create_table_cell(row_index, 'Was', calendar));
                calendar_table.appendChild(tr);
            }
            
            filter_table(true);

        }

        hidePreloader();
        
        load_google_sheet();
	});

	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });
    
    // CALENDAR
    function filterCalendar(calendar_table, show_future){
        for (let row_index= 0; row_index < calendar_table.children.length; row_index++){
            calendar_table.children[row_index].style = "";
        }


        // for (var j = 0; j < td.length; j++) {
        //     cell = tr[i].getElementsByTagName("td")[j];
        //     if (cell) {
        //       if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //         break;
        //       } 
        //     }
        //   }
    }

    function filter_table(show_future){
        $('#calendar-table tr').each(function() {
            // https://stackoverflow.com/questions/7151543/convert-dd-mm-yyyy-string-to-date
            let date_object = new Date($(this.children[0]).text().replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"))
            if (show_future){
                if (date_object < new Date())
                {
                    $(this).hide();
                }
            }else{
                if (date_object > new Date() || isNaN(date_object))
                {
                    $(this).hide();
                }
            }
        });
    }
    $('#calendar_toggle').on('change', function() {
        let calendar_table = document.getElementById('calendar-table')
        
        $('tr').show();
        filter_table(this.checked);
    });

    // GALLERY 
    var slideIndex = 1;
    showSlides(slideIndex);

    $('.prev').on('click', function() {
        showSlides(slideIndex -= 1);
    });
    $('.next').on('click', function() {
        showSlides(slideIndex += 1);
    });

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "flex";
    }
    
    $('#btn_statutes').on('click',function(){
        expandStatutes()
    })

    function expandStatutes() {
        var dots = document.getElementById("expand-dots");
        var moreText = document.getElementById("expand-more");
        var btnText = document.getElementById("btn_statutes");
      
        if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Aufklappen";
          moreText.style.display = "none";
        } else {
          dots.style.display = "none";
          btnText.innerHTML = "Zuklappen";
          moreText.style.display = "inline";
        }
      }


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


   
    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);