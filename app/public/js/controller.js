var webController;
$(function(){
  $form = $('#createBook');
  $search =  $('#search');
  $content = $('.content');

  webController = {
    index: function(){
      $search.click(function() {
        var URL = 'api/books?';
        var queryes = {
          title: $('#searchTitle').val(),
          author: $('#searchAuthor').val(),
          price: $('#searchPrice').val(),
        };

        Object.keys(queryes)
          .forEach(function (key) {
            if (queryes[key])
              URL +=  '&' + key + '=' + encodeURI(queryes[key]);
          });

        $.ajax({
          type: 'GET',
          url: URL,
          contentType: 'application/json',
          success: function(data) {
            $books = $content.find('.book');
            data.forEach(function(book) {
              $books.remove();
              $content.append(bookTemplate(book));
            });
          },
        });
      });
    },

    add: function() {
      $form.submit(function (e) {
        var payload = {
          title: $form.find('#title').val(),
          author: $form.find('#author').val(),
          publication: $form.find('#publication').val(),
          ISBN: $form.find('#isbn').val(),
          price: $form.find('#price').val(),
          image: $form.find('#image').val(),
        };
        $.ajax({
          type: 'POST',
          url: 'api/books',
          data: JSON.stringify(payload),
          contentType: 'application/json',
          success: function(data) {
            alert('Book created');
            window.location.pathname = '';
          },
        });
        return false;
      });
    },
    edit: function () {
      console.log('EDIT')
      $form.submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var payload = {
          _id: $form.find('#id').val(),
          title: $form.find('#title').val(),
          author: $form.find('#author').val(),
          publication: $form.find('#publication').val(),
          ISBN: $form.find('#isbn').val(),
          price: $form.find('#price').val(),
          image: $form.find('#image').val(),
        };

        $.ajax({
          type: 'PUT',
          url: '/api/books',
          data: JSON.stringify(payload),
          contentType: 'application/json',
          success: function(data) {
            alert('Book Updated');
            window.location.pathname = '';
          },
        });
        return false;
      });
    },
  }
})