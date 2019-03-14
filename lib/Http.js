import bodyParser from 'body-parser'

// Function to return express middleware that parses the body as json and verifies it
export function jsonBody () {
  return bodyParser.json({
    verify: (req, res, buffer) => {
      const body = buffer.toString('utf8')
      try {
        JSON.parse(body)
      } catch (error) {
        return res.status(400).json({
          error: 'Cannot parse body as JSON.'
        })
      }
      return true
    }
  })
}
