// site loader
// --------------------------------------------------
//

  function fn_siteLoader() {
    $('.site-loader').velocity('fadeOut', {
      queue: false,
      delay: 500,
      duration: 800,
      complete: function() {
        $body.addClass('is-loaded');
        $(document).trigger('is-loaded');
      }
    });
  }

//

// add loader class
if (!_section_change_loader) {
  $body.addClass('is-site-loader-off');
}



          $('.site-loader').velocity('fadeIn', {
            queue: false,
            delay: animationDelay + 500,
            duration: 800,
            complete: function() {
              $body.removeClass('animating');

              $('.site-wrap').scrollTop(0);
              $('.site-wrap').perfectScrollbar('update');

              $('.section').filter('.is-active').removeClass('is-active');
              $(id).addClass('is-active');
              $('[data-link="' + id + '"]').addClass('is-active');
              $.each(ids, function(i, v) {
                $body.removeClass(v + '-in');
              });
              $body.addClass(id.replace('#', '') + '-in');
              $('.form-group').removeClass('error');
              $('.form-notify').removeClass('success error').html('').hide();

              if (_section_change_loader) {
                $(this).velocity('fadeOut', {
                  delay: 100,
                  duration: 800,
                });
              } else {
                $(this).velocity('fadeOut', {
                  delay: 100,
                  duration: 100,
                });
              }
            }
          })
