(function($, document, window, undefined) {
  'use strict';

  var toggle = '[data-toggle="dropdown"]';

  var Dropdown = function(element) {
    $(element).on('click.dropdown', this.toggle);
  }

  Dropdown.prototype.toggle = function(e) {
    e.preventDefault();

    var $toggle    = $(e.currentTarget);
    var $container = $toggle.closest('.dropdown');
    var verticalFit = $container.data('verticalfit');

    console.log(verticalFit);


    if ($container.hasClass('open')) {
      $container.removeClass('open');
      return;
    }

    var $menu = $container.find('.dropdown-menu').first();

    if (verticalFit) {

      $menu.css({ height: $(verticalFit).height() });
    }

    $toggle.trigger('focus');
    $container.addClass('open');
  }

  Dropdown.prototype.keydown = function(e) {
    if (e.keyCode == 27) {
      clearDropdowns(e);
    }
  }

  function clearDropdowns(e) {
    var $target = $(e.target);

    $('.dropdown.open').each(function() {
      if ($(this).find($target).length === 0 || e.keyCode == 27) {
        $(this).removeClass('open');
      }
    });
  }

  $(document)
    .on('click.dropdown', clearDropdowns)
    .on('click.dropdown', toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown', toggle, Dropdown.prototype.keydown);

})(jQuery, document, window);
