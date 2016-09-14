/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$('a.portfolio-link').bind('click', function (event) {
    var self = this;
    var data = $.ajax({
        url: '/pictures/' + $(this).data("i18nkey"),
        success: function(data) {
            $('#imgportfoliomodal').attr('alt', data.alt);
            $('#imgtitlemodal').html(data.alt);
            $('#imagedescmodal').html(data.desc);
            $('#imgportfoliomodal').attr('src', $(self).data("imgsrc"));
            $('#imgportfoliomodal').attr('alt', $(self).data("imgalt"));
            $('#portfolioModal1').addClass('in');
            $('#portfolioModal1').toggle();
            $('body').addClass('modal-open');
        },
        dataType: 'json'
    });
    
    event.preventDefault();
});

$('*[data-dismiss="modal"]').bind('click', function (event) {
    $('#portfolioModal1').removeClass('in');
    $('#portfolioModal1').toggle();
    $('body').removeClass('modal-open');
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});