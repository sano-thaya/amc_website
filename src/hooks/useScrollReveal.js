import { useEffect, useRef } from 'react'

/**
 * useScrollReveal — attaches IntersectionObserver to children
 * with class "reveal" and adds "is-visible" when in viewport.
 */
export function useScrollReveal(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const defaults = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
      ...options,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, defaults)

    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}
