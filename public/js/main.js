$(function() {

  var loading = $('#loading'),
      loadingText = $('#loading-text'),
      submit = $('#submit'),
      submitText = $('#submit-text'),
      bipNumber = $('#bip-number'),
      alert = $('#alert');

  $('#form').on('submit', function(e) {
    e.preventDefault();

    if (!bipNumber.val()) {
      return handleEmptyNumber();
    }

    toggleWaiting();
    alert.hide();
    alert.removeClass();
    submit.prop('disabled', true);

    $.ajax({
      url: '/api/balance/' + bipNumber.val(),
    }).done(function(res) {
      handleResponse(res);
      toggleWaiting();
      submit.prop('disabled', false);
    });
  });

  function toggleWaiting() {
    [loading, loadingText, submitText].forEach(function(el) {
      el.toggle();
    });
  }

  function handleResponse(res) {
    if(res.balance) {
      alert.html("Saldo: " + res.balance);
      alert.addClass('alert-success');
    } else {
      alert.html("No se ha encontrado el número de la tarjeta Bip!");
      alert.addClass('alert-danger');
    }
    alert.addClass('alert');
    alert.show();
  }

  function handleEmptyNumber() {
    alert.html("Debe ingresar un número de tarjeta Bip!");
    alert.addClass('alert alert-danger');
    alert.show();
  }

});
