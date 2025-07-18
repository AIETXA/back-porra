function adminSessionMiddleware(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }

  res.redirect('/login?error=1');
}

module.exports = adminSessionMiddleware;