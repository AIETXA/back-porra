function adminSessionMiddleware(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }

  res.redirect('/admin/login?error=1');
}

module.exports = adminSessionMiddleware;