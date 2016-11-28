// Mass-action tables
function tableMassActions(label_none, label_selected) {
  var $controller = $('.mass-controller');
  var $master = $('.master-checkbox');
  var $form = $controller.parents('form');

  var items_num = $('.table tr input[type=checkbox]').length;
  if (items_num == 0) {
    $master.prop("disabled", true);
  }

  $form.find('.dropdown-menu button').click(function() {
    if ($(this).data('confirmation')) {
      var confirmation = confirm($(this).data('confirmation'));
      return confirmation;
    } else {
      return true;
    }
  });

  function enableController(selected_no) {
      $controller.removeClass('btn-default');
      $controller.addClass('btn-primary');

      var fin_label = label_selected.replace(0, selected_no)
      $controller.html('<span class="fa fa-gears"></span> ' + fin_label);
      $controller.prop("disabled", false);
  }

  function disableController() {
      $controller.removeClass('btn-primary');
      $controller.addClass('btn-default');
      $controller.html('<span class="fa fa-exclamation-circle"></span> ' + label_none);
      $controller.prop("disabled", true);
  }

  $('.table tr').each(function() {
    var $row = $(this);
    var $checkbox = $row.find('input[type=checkbox]');
    var $label = $checkbox.parent();

    $label.addClass('ninja-label');
    $label.parent().append('<a href="#"><span class="fa fa-check"></span></a>');
    var $check = $label.parent().find('a');

    if ($checkbox.prop("checked")) {
      $check.toggleClass('active');
      $row.addClass('active');
    }

    $check.click(function() {
      $(this).toggleClass('active');
      if ($(this).hasClass('active')) {
        $(this).parent().find('input').prop("checked", true);
        $row.addClass('active');
      } else {
        $(this).parent().find('input').prop("checked", false);
        $row.removeClass('active');
      }

      var selected_no = $('.table tr.active').length;
      if (selected_no > 0) {
        enableController(selected_no);
      } else {
        disableController();
      }

      if (items_num == selected_no) {
        $master.addClass('active');
      } else {
        $master.removeClass('active');
      }

      return false;
    });
  });

  var selected_no = $('.table tr.active').length;
  if (selected_no > 0) {
    enableController(selected_no);
  } else {
    $controller.html('<span class="fa fa-exclamation-circle"></span> ' + label_none);
    $controller.prop("disabled", true);
  }

  if (items_num > 0 && items_num == selected_no) {
    $master.addClass('active');
  } else {
    $master.removeClass('active');
  }

  $master.click(function() {
    if ($master.hasClass('active')) {
      $master.removeClass('active');
      if (items_num > 0) {
        disableController();
        $('.table tr input[type=checkbox]').each(function() {
          var $row = $(this).parents('tr');
          var $checkbox = $row.find('input[type=checkbox]');
          var $check = $checkbox.parent().parent().find('a');

          $checkbox.prop("checked", false);
          $row.removeClass('active');
          $check.removeClass('active');
        });
      }
    } else {
      $master.addClass('active');
      if (items_num > 0) {
        enableController(items_num);
        $('.table tr input[type=checkbox]').each(function() {
          var $row = $(this).parents('tr');
          var $checkbox = $row.find('input[type=checkbox]');
          var $check = $checkbox.parent().parent().find('a');

          $checkbox.prop("checked", true);
          $row.addClass('active');
          $check.addClass('active');
        });
      }
    }
  });
}
