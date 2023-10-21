import sanitize from 'mongo-sanitize'

export const sanitizeQuery = async (req, res, next) => {
  sanitize(req.query)
  next()
}
