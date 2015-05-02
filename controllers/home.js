/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {

  if (req.user) {
    if (req.user.accountType==='Musician') {
      res.redirect('/homeMusician');
    } else if (req.user.accountType==='Facility') {
      res.redirect('/homeFacility');
    } else if (req.user.accountType==='Admin') {
      res.redirect('/homeAdmin');
    } else {

      res.render('home', {
        title: 'Home'
      });
    }
  } else {

    res.render('home', {
      title: 'Home'
    });
  }
};