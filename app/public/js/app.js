$(function() {
  page('/', webController.index);

  page('/add', webController.add);
  page('/edit/:id', webController.edit);

  page();
});
