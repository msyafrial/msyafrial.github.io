<script setup lang="ts">
import { onMounted, type Component } from 'vue'

import {
  ArrowRight,
  Cpu,
  Github,
  HardDrive,
  Layers3,
  PlugZap,
  PanelRightClose,
  Radio,
  Youtube,
  Loader,
  TimerOff
} from 'lucide-vue-next'

import ToolCard from '@/components/ToolCard.vue'

type Tool = {
  title: string
  href: string
  description: string
  badges: string[]
  featured?: boolean
  icon?: Component
}

const TOOL_ESP_CONNECT = 'https://thelastoutpostworkshop.github.io/microcontroller_devkit/espconnect/'
const TOOL_ARDUINOMAKERWORKSHOP = 'https://youtu.be/rduTUUVkzqM'
const TOOL_GPIOVIEWER = 'https://youtu.be/UxkOosaNohU'
const TOOL_SLASHCOMPILETIME = 'https://youtu.be/7zbgSVHE4EE'
const TOOL_PARTITION_BUILDER =
  'https://thelastoutpostworkshop.github.io/microcontroller_devkit/esp32partitionbuilder/'
const TOOL_ESP_CONNECT_TEST =
  'https://thelastoutpostworkshop.github.io/microcontroller_devkit/espconnect_test/'

const YOUTUBE_URL = 'https://www.youtube.com/@thelastoutpostworkshop'
const GITHUB_URL = 'https://github.com/thelastoutpostworkshop'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Tools', href: '#tools' },
  { label: 'About', href: '#about' },
] as const

const scrollToHash = (hash: string) => {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  const target = document.getElementById(id)
  if (!target) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
}

const clearHash = () => {
  if (!window.location.hash) return
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

const onInPageNavClick = (event: MouseEvent, href: string) => {
  if (!href.startsWith('#')) return
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  event.preventDefault()
  scrollToHash(href)
  clearHash()
}

onMounted(() => {
  if (!window.location.hash) return
  const hash = window.location.hash
  requestAnimationFrame(() => {
    scrollToHash(hash)
    clearHash()
  })
})

const tools: Tool[] = [
  {
    title: 'ESPConnect',
    href: TOOL_ESP_CONNECT,
    description:
      'Zero-installation web application that lets you explore, back up, and manage your ESP32… right from your browse.',
    badges: ['Web', 'ESP32', 'USB', 'Backup Flash', 'SPIFFS', 'LittleFS', 'Fat', 'NVS Inspector', 'Serial Monitor'],
    featured: true,
    icon: PlugZap
  },
  {
    title: 'Arduino Maker Workshop',
    href: TOOL_ARDUINOMAKERWORKSHOP,
    description:
      'The ultimate tool for makers to bring Arduino projects to life in Visual Studio Code.',
    badges: ['VSCode', 'Arduino','Extension'],
    icon: PanelRightClose
  },
  {
    title: 'ESP32 Partition Builder',
    href: TOOL_PARTITION_BUILDER,
    description:
      'Design your own custom partition for the ESP32 with confidence.',
    badges: ['Web', 'ESP32', 'Partitions'],
    icon: Layers3
  },
  {
    title: 'GPIO Viewer Library',
    href: TOOL_GPIOVIEWER,
    description:
      'See live GPIO Pins on ESP32 boards.',
    badges: ['Web', 'Mobile', 'ESP32','Arduino Library'],
    icon: Loader
  },
  {
    title: 'Slash Compile Time',
    href: TOOL_SLASHCOMPILETIME,
    description:
      'how to slash your build times by over 50% using the Arduino IDE on WSL, or Visual Studio Code, and the Arduino Maker Workshop extension.',
    badges: ['Arduino IDE', 'VSCode'],
    icon: TimerOff
  },

]

const highlights = [
  {
    title: 'Flash firmware from your browser',
    body: 'Connect over Web Serial and push new builds fast—no heavyweight installers.',
    icon: Cpu
  },
  {
    title: 'Inspect partition layouts',
    body: 'Plan tables, validate offsets, and avoid overlap before you ship.',
    icon: Layers3
  },
  {
    title: 'Work with storage & filesystems',
    body: 'Reason about data partitions (SPIFFS/LittleFS patterns) and keep space predictable.',
    icon: HardDrive
  },
  {
    title: 'Serial monitor workflow',
    body: 'Streamline logging, resets, and quick device checks with a browser-based serial monitor flow.',
    icon: PlugZap
  }
]

const featured = [
  {
    label: 'Featured',
    title: 'ESPConnect',
    body: 'The fastest path from “new build” to “running on hardware”.',
    href: TOOL_ESP_CONNECT
  },
  {
    label: 'What’s new',
    title: 'Landing hub refresh',
    body: 'A single place to find tools, links, and the latest Workshop updates.',
    href: '#home'
  }
]

const year = new Date().getFullYear()
</script>

<template>
  <a href="#main" @click="onInPageNavClick($event, '#main')"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:text-slate-50 focus:ring-2 focus:ring-cyan-300">
    Skip to content
  </a>

  <div class="min-h-screen text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      <div
        class="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(34,211,238,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div
        class="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:1px_5px] mix-blend-overlay" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(34,211,238,0.16),transparent_55%)]" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
    </div>

    <header class="sticky top-0 z-40 border-b border-cyan-500/10 bg-slate-950/70 backdrop-blur">
      <div class="container-pad">
        <div class="flex h-16 items-center justify-between gap-4">
          <a href="#home"
            @click="onInPageNavClick($event, '#home')"
            class="group inline-flex items-baseline gap-2 rounded-md text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            <span class="font-semibold tracking-tight">The Last Outpost Workshop</span>
            <span class="hidden font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70 sm:inline">
              Hub
            </span>
            <span class="sr-only">(Back to top)</span>
          </a>

          <nav aria-label="Primary" class="hidden items-center gap-6 sm:flex">
            <a v-for="item in nav" :key="item.href" :href="item.href" @click="onInPageNavClick($event, item.href)"
              class="rounded-md px-2 py-1 text-sm text-slate-200/85 transition hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              {{ item.label }}
            </a>
          </nav>

          <div class="flex items-center gap-2">
            <a class="icon-btn" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
              title="GitHub">
              <Github class="h-5 w-5" aria-hidden="true" />
            </a>
            <a class="icon-btn" :href="YOUTUBE_URL" target="_blank" rel="noopener noreferrer"
              aria-label="YouTube channel" title="YouTube">
              <Youtube class="h-5 w-5" aria-hidden="true" />
            </a>
            <a class="btn btn-primary hidden sm:inline-flex" :href="TOOL_ESP_CONNECT" target="_blank"
              rel="noopener noreferrer">
              Open ESPConnect
              <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </a>
            <a class="btn btn-primary sm:hidden" :href="TOOL_ESP_CONNECT" target="_blank" rel="noopener noreferrer">
              ESPConnect
            </a>
          </div>
        </div>

        <nav aria-label="Primary" class="-mt-2 flex gap-2 overflow-x-auto pb-4 sm:hidden">
          <a v-for="item in nav" :key="item.href" :href="item.href" @click="onInPageNavClick($event, item.href)"
            class="shrink-0 rounded-full border border-slate-400/15 bg-slate-950/40 px-3 py-1.5 text-sm text-slate-200/85 transition hover:border-cyan-400/25 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            {{ item.label }}
          </a>
        </nav>
      </div>
    </header>

    <main id="main">
      <section id="home" class="section">
        <div class="container-pad">
          <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div class="lg:col-span-12">
              <p class="section-kicker">Browser tools for makers</p>
              <h1 class="mt-3 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                Tools and Tutorials for <span class="text-cyan-200">Modern Makers</span>
              </h1>
              <p class="mt-5 max-w-xl text-base leading-relaxed text-slate-200/85 sm:text-lg">
                Web-based tools and hands-on tutorials to help you build, debug, and understand
                <span class="text-cyan-200">Arduino</span> and <span class="text-cyan-200">ESP32</span> projects.
              </p>

              <div class="mt-8 flex flex-wrap items-center gap-3">
                <a class="btn btn-primary" :href="TOOL_ESP_CONNECT" target="_blank" rel="noopener noreferrer">
                  Discover ESPConnect
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </a>
                <a class="btn btn-secondary" :href="YOUTUBE_URL" target="_blank" rel="noopener noreferrer">
                  Tutorials
                  <ArrowRight class="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <dl class="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
                <div class="panel p-4">
                  <dt class="font-mono text-xs uppercase tracking-[0.18em] text-slate-200/70">Arduino</dt>
                  <dd class="mt-2 text-sm text-slate-50">ESP32 &amp; more</dd>
                </div>
                <div class="panel p-4">
                  <dt class="font-mono text-xs uppercase tracking-[0.18em] text-slate-200/70">Focus</dt>
                  <dd class="mt-2 text-sm text-slate-50">Maker tools &amp; tutorials </dd>
                </div>
                <div class="panel p-4">
                  <dt class="font-mono text-xs uppercase tracking-[0.18em] text-slate-200/70">Display</dt>
                  <dd class="mt-2 text-sm text-slate-50">Graphics &amp; videos </dd>
                </div>
              </dl>
            </div>


          </div>
        </div>
      </section>

      <section id="tools" class="section scroll-mt-20">
        <div class="container-pad">
          <div v-reveal>
            <p class="section-kicker">Tools</p>
            <h2 class="section-title">Makers' Toolbox</h2>
            <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200/85 sm:text-base">
              Tools that <span class="text-cyan-200">simplify</span> real-world maker projects
            </p>
          </div>

          <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(tool, index) in tools" :key="tool.href" v-reveal="{ delay: 75 * index }">
              <ToolCard :tool="tool" />
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="section scroll-mt-20">
        <div class="container-pad">
          <div class="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div class="lg:col-span-8" v-reveal="{ delay: 120 }">
              <div class="panel p-6">
                <p class="section-kicker">Creator</p>
                <div class="mt-5 flex items-start gap-5">
                  <div class="shrink-0">
                    <div class="panel relative w-fit p-2">
                      <div
                        class="pointer-events-none absolute inset-x-2 top-2 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-80" />
                      <picture>
                        <source srcset="/portrait.webp" type="image/webp" />
                        <img src="/portrait.png" width="384" height="384" alt="Portrait photo"
                          class="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" loading="lazy" decoding="async" />
                      </picture>
                    </div>
                  </div>

                  <div class="min-w-0">
                    <h3 class="text-lg font-semibold tracking-tight text-slate-50">
                      A <span class="text-cyan-200">Star Wars</span> prop builder, who was led to the unexpected and
                      captivating realm of <span class="text-cyan-200">microcontroller programming</span>
                    </h3>
                    <p class="mt-2 text-sm leading-relaxed text-slate-300">
                      What began as a creative hobby evolved into a passion for Arduino and ESP32 development — building
                      tools, experimenting with hardware, and sharing practical knowledge along the way.

                      The Last Outpost Workshop brings together hands-on projects, open-source tools, and clear
                      tutorials to help makers better understand their hardware and build with confidence.
                    </p>
                  </div>
                </div>

                <div class="mt-6 flex flex-wrap items-center gap-3">
                  <a class="btn btn-primary" :href="YOUTUBE_URL" target="_blank" rel="noopener noreferrer">
                    Youtube Channel
                    <ArrowRight class="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a class="btn btn-primary" :href="GITHUB_URL" target="_blank" rel="noopener noreferrer">
                    GitHub Repositories
                    <ArrowRight class="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-cyan-500/10 bg-slate-950/40">
      <div class="container-pad py-10">
        <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-sm font-semibold tracking-tight text-slate-50">The Last Outpost Workshop</p>
            <p class="mt-2 text-sm text-slate-300">
              Tools and Tutorials for Modern Makers.
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-slate-200/70">Navigate</p>
              <ul class="mt-3 space-y-2">
                <li v-for="item in nav" :key="item.href">
                  <a class="rounded-md px-2 py-1 -mx-2 text-sm text-slate-300 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    @click="onInPageNavClick($event, item.href)"
                    :href="item.href">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-slate-200/70">Tools</p>
              <ul class="mt-3 space-y-2">
                <li v-for="tool in tools" :key="tool.href">
                  <a class="rounded-md px-2 py-1 -mx-2 text-sm text-slate-300 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    :href="tool.href" target="_blank" rel="noopener noreferrer">
                    {{ tool.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col gap-3 border-t border-slate-400/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs text-slate-300">© {{ year }} The Last Outpost Workshop.</p>
          <p class="text-xs text-slate-300">
            Built with Vue 3 + Tailwind.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
