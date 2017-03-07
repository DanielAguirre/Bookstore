function bookTemplate(book){
  var template = '<div class="book"><div class="book-cover">' +
  '<img src={{image}}></div>' +
  '<div class="book-content">' +
    '<p class="book-title">{{title}}</p>' +
    '<p class="book-autho">{{author}}</p>' +
    '<p class="book-publication">{{date}}</p>' +
    '<a class="book-edit" href="/edit/{{_id}}">Edit</a>' +
    '</div></div>';

  var templateTmp = template.replace('{{image}}', book.inage)
                            .replace('{{title}}', book.title)
                            .replace('{{author}}', book.author)
                            .replace('{{date}}', book.date)
                            .replace('{{_id}}', book['_id']);
  return  templateTmp;
}
