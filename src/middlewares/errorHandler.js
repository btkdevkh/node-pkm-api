export const errorHandler = (req, res, next) => {
  res.status(404)

  res.json({ 
    message: "Page not found",
  })
}
