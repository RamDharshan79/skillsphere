import crypto from 'crypto'

export function computeDocId(courseURL) {
  return crypto.createHash('sha1').update(courseURL).digest('hex')
}
