// Saves options to chrome.storage

var defaultCurrency = "USD"

function save_options() {
    var currency = document.getElementById('currency').value;

    chrome.storage.sync.set({
    currency: currency,
    conversion: 0.0
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      currency: defaultCurrency,
    }, function(items) {
      document.getElementById('currency').value = items.currency;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',save_options);