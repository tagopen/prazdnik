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
  $('.checkbox-btn__box').on('click', function() {
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
    $('.gender__select').removeClass('gender__select--active');
    $($gender + '.gender__select').addClass('gender__select--active');
  });
});  

$(document).ready (function() {
  var $cookie = $.cookie('personalID');
  if ($cookie === null) {
    $.cookie('personalID', ID());
  }
});

// generate customer ID
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
        console.log($startPosRope);
    $(document).mousemove(function(e){
      $currPosY = e.pageY;
      if ($currPosY >= $actionPosY) {
        $('.rope').css({
          opacity: '0'
        });
        $('body').css({
          height    : '100%',
          overflow  : 'hidden'
        });
        $('.order').slideUp();
        $('body').html('<img class="hollocosta" src="img/hny.jpeg"/>');
        $('.hollocosta').css({
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          margin: 'auto'
        });
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