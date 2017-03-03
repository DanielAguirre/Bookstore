const home = {
  index(req, res) {
    res.render('index', { title: 'BooksTore' });
  },
  catalog(req, res) {
    res.render('catalog', { title: 'Brows Catalog' });
  },
};

module.exports = home;
