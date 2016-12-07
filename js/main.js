$(document).ready(function(){
    $(".navbar").on("click",".navbar__point", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top -$('.navbar').outerHeight()+2}, 1500);
    });
});
// Equal Height function
$.fn.equialHeight = function() {
  var $tallestcolumn = 0;
  var $currentHeight = 0;
  $.each($(this), function (index, value) {
    $currentHeight = $(this).height();
    if($currentHeight > $tallestcolumn)
    {
      $tallestcolumn = $currentHeight;
    }
  });
  $(this).height($tallestcolumn);
  return $(this);
} 

// Old browser notification
$(function() { 
  $.reject({
    reject: {
      msie: 9
    },
    imagePath: 'img/icons/jReject/',
    display: [ 'chrome','firefox','safari','opera' ],
    closeCookie: true,
    cookieSettings: {
      expires: 60*60*24*365
    },
    header: 'Ваш браузер устарел!',
    paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
    paragraph2: 'Пожалуйста, установите современный браузер:',
    closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
    closeLink: 'Закрыть это уведомление',
  });
});

// Advatage button
$(document).ready( function() {
  var $firstTab = $('.tabs__item').first().index();
  var $lastTab = $('.tabs__item').last().index();
  
  $('.navigation__btn--prev').on('click', function() {
    var $activeTab = $('.tabs__item--active');
    var $prevTab = $activeTab.prev();
    
    if ($activeTab.index() > $firstTab) {
      var $idTab = '#' + $activeTab.attr('id');
      $('.order__item').each(function() {
        if ($(this).attr('href') == $idTab) {
          $(this).removeClass('order__item--active');
        }
      });
      $('.tabs__item').removeClass('tabs__item--active');
      $prevTab.addClass('tabs__item--active');
    }
  });
  
  $('.navigation__btn--next').on( 'click', function() {
    var $activeTab = $('.tabs__item--active');
    var $nextTab = $activeTab.next();
    if ($activeTab.index() < $lastTab) {
      var $idTab = '#' + $nextTab.attr('id');
      $('.order__item').each(function() {
        if ($(this).attr('href') == $idTab) {
          $(this).addClass('order__item--active');
        }
      });
      $('.tabs__item').removeClass('tabs__item--active');
      $nextTab.addClass('tabs__item--active');
     }
  });
});

$(document).ready(function(){
  $('.gender__click').click( function () {
    $('.gender__man, .gender__woman').toggleClass('gender__active');
  });
});  

/*$(document).ready(function(){
  var selc = $(".gender__select :selected").text();
  $(".result").text(selc);
});*/
$(document).ready(function(){
  $(".gender__input").keyup(function () {
   var value = $(this).val();
   $(".result").text(value);
 }).keyup();
});