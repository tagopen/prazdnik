$(function() {

    $(".contactForm input,.contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $("[type=submit]").prop("disabled", true).button('loading'); //prevent submit behaviour and display preloading
            // get values from FORM
            var data = new FormData();

            var form = $('.contactForm').attr("name");
            var customerID = $.cookie('personalID');
            var package = $('[name=package]:checked').siblings('.checkbox-btn__box').text() + ' (+' + $('[name=package]:checked').data('price') + ' гривен)';
            if ($('#rbtn2').is(':checked')) {
                var childrean = $('.child__btn [name=radiobtn]:checked').siblings('.checkbox-btn__box').text() + ' (+' + $('#rbtn2').data('price') + ' гривен)';
            } else {
                var childrean = $('.child__btn [name=radiobtn]:checked').siblings('.checkbox-btn__box').text()
            }
            //child-1
            if ($('#addChild-1').is(':checked')) {
                var child1_name =  $('#addChild-1').data('title') + ' ' +
                                   $('#childrean-1').find('[name=gender]:checked').siblings('.radio-btn__box').text() + ' - ' +
                                   $('#childrean-1').find('[type=text]').val() + ' (+ ' + 
                                   $('#addChild-1').data('price') + ' гривен)';
            } else {
                var child1_name =  $('#childrean-1').find('.gender__select--active option:selected').text();
                var child2_name = 'нет';
            }
            //child-2
            if (!($('#childrean-2').is('.gender__item--hidden'))) {
                if ($('#addChild-2').is(':checked')) {
                    var child2_name = $('#addChild-2').data('title') + ' ' +
                                      $('#childrean-2').find('[name=childrean]:checked').siblings('.radio-btn__box').text() + ' - ' +
                                      $('#childrean-2').find('[type=text]').val() + ' (+ ' + 
                                      $('#addChild-2').data('price') + ' гривен)';
                } else {
                    var child2_name = $('#childrean-2').find('.gender__select--active option:selected').text();
                }
            }
            //download file
            if ($('#download-false').is(':checked')) {
                var photo = $('#download-false').siblings('.radio-btn__box').text();
            } else {
                var photo = $('#download-true').data('title') + ' (+ '+
                          + $('#download-true').data('price') + ' гривен)';
            }
            var str = $('.download__file').val().split('\\');
            var filename = str[str.length-1];
            var file = $('input[type=file]')[0];
            var email = $('.modal__form').find("[name=mail]").val();
            var phone = $('.modal__form').find("[name=phone]").val();
            var name = $('.modal__form').find("[name=name]").val();
            var promo = $('[name=promo]').val();
            var fullcost = $('.price__cost').text();

            if (form) { data.append('user_form', form)}
            if (customerID) { data.append('user_customerID', customerID)}
            if (package) { data.append('user_package', package)}
            if (childrean) { data.append('user_childrean', childrean)}
            if (photo) { data.append('user_photo', photo)}
            if (child1_name) { data.append('child1_name', child1_name)}
            if (child2_name) { data.append('child2_name', child2_name)}
            if (filename) { data.append('user_filename', filename)}         
            if (email) { data.append('user_email', email)}
            if (phone) { data.append('user_phone', phone)}
            if (name) { data.append('user_name', name)}
            if (promo) { data.append('user_promo', promo)}
            if (fullcost) { data.append('user_fullcost', fullcost)}
            if (file)    { data.append('user_file', file.files[0]); }

            $.ajax({
                url: "././mail/mail.php",
                type: "POST",
                data: data,
                dataType: 'text',
                processData: false,
                contentType: false,
                cache: false,
                success: function() {
                    // Success message

                    // remove prevent submit behaviour and disable preloading
                    $("[type=submit]").prop("disabled", false).button('reset');

                    document.location.href = '/success.html';

                    //clear all fields
                    $('.contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    
                    // remove prevent submit behaviour and disable preloading
                    $("[type=submit]").prop("disabled", false).button('reset'); 

                    //clear all fields
                    $('.contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('.success').html('');
});
