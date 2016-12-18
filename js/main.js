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
$(function() { 
  $('.package__photo').equialHeight();
});
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
      $('.package__btn .checkbox-btn__control').prop("checked", false);
      $('#package-' + number).prop("checked", true);
    }
  }
});
// upload file
var filesExt = ['jpg', 'jpeg', 'bmp', 'png', 'JPG', 'JPEG', 'BMP', 'PNG']; 
$('.download__file[type=file]').change(function( event ){
    var parts = $(this).val().split('.');
    if(filesExt.join().search(parts[parts.length - 1]) != -1) {
    var files = this.files;
    event.stopPropagation(); // Остановка происходящего
    event.preventDefault();  // Полная остановка происходящего
 
    // Создадим данные формы и добавим в них данные файлов из files
    var data = new FormData();
    $.each( files, function( key, value ){
      data.append(key, value);
    });
    $('.download__preview').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw download__preload"></i><span class="sr-only">Идёт загрузка...</span>');
    // Отправляем запрос
    $.ajax({
      url: '/congratulation/mail/upload/submit.php?uploadfiles',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false, // Не обрабатываем файлы (Don't process the files)
      contentType: false, // Так jQuery скажет серверу что это строковой запрос
      success: function( respond, textStatus, jqXHR ){

          // Если все ОК

          if( typeof respond.error === 'undefined' ){
            // Файлы успешно загружены, делаем что нибудь здесь
            // выведем пути к загруженным файлам в блок '.ajax-respond'
            var files_path = respond.files;
            var html = '';
            $.each( files_path, function( key, val ){ html += '<img class="img-responsive" src="' + val + '" alt="Превью" />' } );
            $('.download__preview').html( html );
          }
          else{
            console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
          }
      },
      error: function( jqXHR, textStatus, errorThrown ){
        $('.download__preview').html('<div class="notify style="color: #ff0000;">' + textStatus +'</div>');
      }
  });
    } else {
        $('.download__preview').html('<div class="notify style="color: #ff0000;">Неправильный тип файла</div>');
    }
});

// navigation button
$(document).ready( function() {
  var $firstTab = $('.tabs__item').first().index(),
      $lastTab = $('.tabs__item').last().index();
  
  $('.navigation__btn--prev').on('click', function() {
    var $activeTab = $('.tabs__item--active'),
        $prevTab = $activeTab.prev();
    
    if ($activeTab.index() > $firstTab) {
      var $idTab = '#' + $activeTab.attr('id');

      $('.validate-error').removeClass('validate-error');
      $('.btn-blocked').removeClass('btn-blocked');
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
      $('.navigation__btn--next').show();
      $('.navigation__btn--submit').hide();
    }
  });
  
  $('.navigation__btn--next').on( 'click', function() {
    var $activeTab = $('.tabs__item--active');
    var $nextTab = $activeTab.next();
    if ($activeTab.index() < $lastTab) {
      var $idTab = '#' + $nextTab.attr('id');
      var $validation = true; // never do that
      // validation step-3
      if ($activeTab.attr('id') == 'tab-3') {
        var $genderItem;
        if ($activeTab.find('#childrean-2').is(':visible')) {
          $genderItem = $('#childrean-1, #childrean-2');
        } else {
          $genderItem = $('#childrean-1');
        }
        $genderItem.each(function() {
          var $this = $(this);
          var $checkbox = $this.find('.gender__addname .radio-btn__control');
          var $input = $this.find('.gender__input');
          var $select = $this.find('.gender__select--active');
          if ($checkbox.is(':checked')) {
            if ($input.val() == '') {
              $input.addClass('validate-error');
              $('.navigation__btn--next').addClass('btn-blocked');
              $validation = false;
            } else {
              if ($validation != false) {
                $input.removeClass('validate-error');
                $('.navigation__btn--next').removeClass('btn-blocked');
                $validation = true;
              }
            }
          } else {
            if ($select.val() == null) {
              $select.addClass('validate-error');
              $('.navigation__btn--next').addClass('btn-blocked');
              $validation = false;
            } else {
              $select.removeClass('validate-error');
              if ($validation != false) {
                $('.navigation__btn--next').removeClass('btn-blocked');
                $validation = true;
              }
            }
          }
        });
      }
      //validation step-4
      if ($activeTab.attr('id') == 'tab-4') {
        if (!($('#download-false').is(':checked'))) {
          var filesExt = ['jpg', 'jpeg', 'bmp', 'png', 'JPG', 'JPEG', 'BMP', 'PNG']; // массив расширений
          var parts = $('.download__file[type=file]').val().split('.');
          if ((filesExt.join().search(parts[parts.length - 1]) != -1) && ($('.download__file[type=file]').val() != '') ) {
            $('.download__btn').removeClass('validate-error');
            if ($validation != false) {
              $('.navigation__btn--next').removeClass('btn-blocked');
              $validation = true;
            }
          } else {
            $('.download__btn').addClass('validate-error');
            $('.navigation__btn--next').addClass('btn-blocked');
            $validation = false;
          }
        } else {
          $('.download__btn').removeClass('validate-error');
          if ($validation != false) {
            $('.navigation__btn--next').removeClass('btn-blocked');
            $validation = true;
          }
        }
      }


      //validation step-4
      if ($activeTab.attr('id') == 'tab-5') {
          var $name = $activeTab.find('[name=name]');
          var $email = $activeTab.find('[name=mail]');
          var $phone = $activeTab.find('[name=phone]');

          if ($name.val() == '') {
            e.preventDefault();
            $name.addClass('validate-error');
            $('.navigation__btn--submit').addClass('btn-blocked');
            $validation = false;
          } else {
            if ($validation != false) {
              $name.removeClass('validate-error');
              $('.navigation__btn--submit').removeClass('btn-blocked');
              $validation = true;
            }
          }
          if ($email.val() == '') {
            $email.addClass('validate-error');
            $('.navigation__btn--submit').addClass('btn-blocked');
            $validation = false;
          } else {
            if ($validation != false) {
              $email.removeClass('validate-error');
              $('.navigation__btn--submit').removeClass('btn-blocked');
              $validation = true;
            }
          }
          if ($phone.val() == '') {
            $phone.addClass('validate-error');
            $('.navigation__btn--submit').addClass('btn-blocked');
            $validation = false;
          } else {
            if ($validation != false) {
              $phone.removeClass('validate-error');
              $('.navigation__btn--submit').removeClass('btn-blocked');
              $validation = true;
            }
          }
          if ($validation == false) {
            $(".contactForm").submit(function(e){
              e.stopPropagation();
            });
          }
        }

      if ($validation) {
        $('.order__item').each(function() {
          var $this = $(this);
          if (($this.attr('href') == $idTab)) {
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

          $('.navigation__btn--submit').show();
          $('.navigation__btn--next').hide();
          $('[data-toggle=cost]').each( function() {
            if ($(this).is(':checked')) {
              var $productPrice = $(this).data('price');
              var $productDescr = $(this).data('description');
              var $productTitle = $(this).data('title');
              $resultHtml += '<tr>';
              $resultHtml += '<td scope="row">' + $number + '</td>';
              $resultHtml += '<td>' + $productTitle + '</td>';
              if ($(this).parent().is('.gender__addname')) {
                $resultHtml += '<td><b>' + $(this).parents('.gender__item').find('.gender__input').val() + '</b></td>';
              } else {
                $resultHtml += '<td><b>' + $productDescr + '</b></td>';
              }
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
     }
  });
});

$(document).ready(function(){
  // select child(s)
  $('.child__btn .checkbox-btn__box').on('click', function() {
    var $childrean = $(this).data('childrean');
    if ($childrean == '1') {
      $('#childrean-1').addClass('col-md-offset-3');
      $('#childrean-2').addClass('gender__item--hidden');
      $('.download__heading').text('Загрузите фотографию ребёнка. Фотография ребёнка появится в Книге Деда Мороза');
    } else {
      $('#childrean-1').removeClass('col-md-offset-3');
      $('#childrean-2').removeClass('gender__item--hidden');
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
  if ($cookie === undefined) {
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