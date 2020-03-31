import { useState, useEffect } from 'react'

export default function (cb = () => {}) {
  const [sequence, setSequence] = useState([])

  const konamiCodeSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

  const keyPress = (e) => setSequence((prev) => [...prev, e.keyCode])

  useEffect(() => {
    sequence.forEach((code, index) => {
      if (code !== konamiCodeSequence[index]) {
        setSequence([])
      }
    })

    if (sequence.toString() === konamiCodeSequence.toString()) {
      cb()
      setSequence([])
    }
  }, [sequence])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => {
      document.removeEventListener('keydown', keyPress)
    }
  }, [cb])

  return sequence
}
