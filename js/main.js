// Equal Height plugin
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

$('.package__photo').equialHeight();

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

$(function() {
  var getVariable = 'step';
  if( window.location.toString().indexOf(getVariable +'=') != -1) {
    var number=(window.location.toString().substr(window.location.toString().indexOf(getVariable+'=')+ getVariable.length+1,50)).toLowerCase();  
    if( number.indexOf('&') != -1) {
      number=(number.substr(0,number.indexOf('&')));
    }

    if ( (number == '1') || (number == '2') || (number == '3')) {
      var $tabItem = $('.order__item[href=#tab-2]');
      $('.tabs__item').removeClass('tabs__item--active');
      $('#tab-2').addClass('tabs__item--active');
      $tabItem.addClass('order__item--active');
      $tabItem.siblings('.order__line').addClass('order__line--active');
      $tabItem.siblings('.order__description').addClass('order__description--active');
    }
  }
});

// navigation button
$(document).ready( function() {
  var $firstTab = $('.tabs__item').first().index(),
      $lastTab = $('.tabs__item').last().index(),
      $navigationBtnNext = $('.navigation__btn--next').text()
  
  $('.navigation__btn--prev').on('click', function() {
    var $activeTab = $('.tabs__item--active'),
        $prevTab = $activeTab.prev();
    
    if ($activeTab.index() > $firstTab) {
      var $idTab = '#' + $activeTab.attr('id');
      $('.order__item').each(function() {
        var $this = $(this);
        if ($this.attr('href') == $idTab) {
          $this.removeClass('order__item--active');
          $this.siblings('.order__line').removeClass('order__line--active');
          $this.siblings('.order__description').removeClass('order__description--active');
        }
      });
      $('.tabs__item').removeClass('tabs__item--active');
      $prevTab.addClass('tabs__item--active');
      $('.navigation__btn--next').text($navigationBtnNext);
    }
  });
  
  $('.navigation__btn--next').on( 'click', function() {
    var $activeTab = $('.tabs__item--active');
    var $nextTab = $activeTab.next();
    if ($activeTab.index() < $lastTab) {
      var $idTab = '#' + $nextTab.attr('id');
      $('.order__item').each(function() {
        var $this = $(this);
        if ($this.attr('href') == $idTab) {
          $this.addClass('order__item--active');

          $this.siblings('.order__line').addClass('order__line--active');
          $this.siblings('.order__description').addClass('order__description--active');
        }
      });
      $('.tabs__item').removeClass('tabs__item--active');
      $nextTab.addClass('tabs__item--active');
      if ($('#tab-5').is(':visible')) {
        var $resultHtml = '',
            $number = '1',
            $totalPrice = 0;

        $('.navigation__btn--next').text('Заказать');
        $('[data-toggle=cost]').each( function() {
          if ($(this).is(':checked')) {
            var $productPrice = $(this).data('price');
            var $productDescr = $(this).data('description');
            var $productTitle = $(this).data('title');
            $resultHtml += '<tr>';
            $resultHtml += '<td scope="row">' + $number + '</td>';
            $resultHtml += '<td>' + $productTitle + '</td>';
            $resultHtml += '<td><b>' + $productDescr + '</b></td>';
            $resultHtml += '<td class="text-right"><b>' + $productPrice + ' гривен</b></td>';
            $resultHtml += '</tr>';
            $number ++;
            $totalPrice += parseInt($productPrice);
          }
        });
        $('.result').html($resultHtml);
        $('.price__cost').text($totalPrice + ' гривен');
      }
     }
  });
});



$(document).ready(function(){
  // select child(s)
  $('.child__btn .checkbox-btn__box').on('click', function() {
    var $childrean = $(this).data('childrean');
    if ($childrean == '1') {
      $('#childrean-1').addClass('col-md-offset-3');
      $('#childrean-2').hide();
      $('.download__heading').text('Загрузите фотографию ребёнка. Фотография ребёнка появится в Книге Деда Мороза');
    } else {
      $('#childrean-1').removeClass('col-md-offset-3');
      $('#childrean-2').show();
      $('.download__heading').text('Загрузите одну совместную фотографию двух детей. Фотография детей появится в Книге <br>Деда Мороза');
    }
  });
  // select gender
  $('.child-gender__item .radio-btn__box').on('click', function() {
    var $gender = $(this).data('gender');
    $(this).parents('.gender__item').find('.gender__select').removeClass('gender__select--active');
    $(this).parents('.gender__item').find($gender).addClass('gender__select--active');
  });
});  
// generate personal ID
$(document).ready (function() {
  var $cookie = $.cookie('personalID');
  if ($cookie === null) {
    $.cookie('personalID', ID());
  }
});

// function customer ID
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

/*$(document).ready(function(){
  var selc = $(".gender__select :selected").text();
  $(".result").text(selc);
});*/
/*$(document).ready(function(){
  $(".gender__input").keyup(function () {
   var value = $(this).val();
   $(".result").text(value);
 }).keyup();
});*/

// easter egg
$(function () {
  var $startPosRope  = -$('.rope').outerHeight() / 2; 
  $('.ic-rope').on('mousedown', function(e) {
    var $startPosY     = e.pageY,
        $currPosY      = e.pageY,
        $ropeMove      = 0,
        $actionPosY    = $startPosY + 150;
    $(document).mousemove(function(e){
      $currPosY = e.pageY;
      if ($currPosY >= $actionPosY) {
        $('.ic-rope').mouseup();
        $('.flip__back .order__box').css({
          height: $('.flip__front .order__box').innerHeight()
        });
        $('.flip').toggleClass('flip--active');
        if ($('.flip__back').is(":visible")) {
          $('.flip__back').hide();
        } else { 
          $('.flip__back').show();
        }
      } else {
        if ($currPosY >= $startPosY) {
          $ropeMove = $currPosY - $startPosY;
          $('.rope').css({
            top: $startPosRope + $ropeMove + 'px'
          }); 
        }
      }
    }); 
  });

  $('.ic-rope').on('mouseup', function(e) {
    $(document).unbind('mousemove');
      $('.rope').css({
        top: $startPosRope + 'px'
      });
  });
});