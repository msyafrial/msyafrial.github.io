import type { Directive } from 'vue'

type RevealOptions = {
  delay?: number
  once?: boolean
  rootMargin?: string
  threshold?: number
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delayMs = binding.value?.delay ?? 0
    if (delayMs > 0) el.style.transitionDelay = `${delayMs}ms`

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.classList.add('reveal--visible')
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal--visible')
      return
    }

    const once = binding.value?.once ?? true

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return

        el.classList.add('reveal--visible')
        if (once) observer.unobserve(el)
      },
      {
        rootMargin: binding.value?.rootMargin ?? '0px 0px -10% 0px',
        threshold: binding.value?.threshold ?? 0.15
      }
    )

    observers.set(el, observer)
    observer.observe(el)
  },
  unmounted(el) {
    const observer = observers.get(el)
    observer?.disconnect()
    observers.delete(el)
  }
}
