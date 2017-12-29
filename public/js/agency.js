/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
var onloadCallback = function() {
  grecaptcha.render('g-recaptcha', {
    sitekey: $('.g-recaptcha').data('sitekey')
  });
};

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=');
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

$(function() {
  $('a.page-scroll').bind('click', function(a) {
    var b = $(this);
    $('html, body')
      .stop()
      .animate(
        { scrollTop: $(b.attr('href')).offset().top },
        1500,
        'easeInOutExpo'
      ),
      a.preventDefault();
  });
  $('a.img-lang').bind('click', function(a) {
    setCookie('lang', $(this).data('lang'), 30);
  });
  $('a.portfolio-link').bind('click', function(a) {
    $('#imgportfoliomodal').attr('alt', $('#' + $(this).data('i18nkey') + 'Alt').val()),
    $('#imgtitlemodal').html($('#' + $(this).data('i18nkey') + 'Alt').val()),
    $('#imagedescmodal').html($('#' + $(this).data('i18nkey') + 'Desc').val()),
    $('#imgportfoliomodal').attr('src', $(this).data('imgsrc')),
    $('#imgportfoliomodal').attr('alt', $('#' + $(this).data('i18nkey') + 'Alt').val()),
    $('#portfolioModal1').addClass('in'),
    $('#portfolioModal1').toggle(),
    $('body').addClass('modal-open');
    a.preventDefault();
  });
  $('*[data-dismiss="modal"]').bind('click', function(a) {
    $('#portfolioModal1').removeClass('in');
    $('#portfolioModal1').toggle();
    $('body').removeClass('modal-open');
  });
  $('div.modal-backdrop.fade.in').bind('click', function(a) {
    $('#portfolioModal1').removeClass('in');
    $('#portfolioModal1').toggle();
    $('body').removeClass('modal-open');
  });
  $('body').scrollspy({ target: '.navbar-fixed-top' }),
  $('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
  });
});
