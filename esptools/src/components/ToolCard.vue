<script setup lang="ts">
import type { Component } from 'vue'
import { ExternalLink } from 'lucide-vue-next'

type Tool = {
  title: string
  href: string
  description: string
  badges: string[]
  featured?: boolean
  icon?: Component
}

defineProps<{
  tool: Tool
}>()
</script>

<template>
  <article
    class="panel group relative overflow-hidden p-6 transition hover:border-cyan-400/25 hover:bg-slate-950/55 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_24px_70px_rgba(0,0,0,0.45)]"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-70"
    />

    <div class="flex items-start gap-4">
      <div
        v-if="tool.icon"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-slate-950/70 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.10)]"
      >
        <component :is="tool.icon" class="h-5 w-5" aria-hidden="true" />
      </div>

      <div class="min-w-0">
        <h3 class="text-lg font-semibold tracking-tight text-slate-50">
          {{ tool.title }}
        </h3>
        <p class="mt-1 text-sm leading-relaxed text-slate-300">
          {{ tool.description }}
        </p>
      </div>
    </div>

    <ul class="mt-4 flex flex-wrap gap-2" aria-label="Badges">
      <li v-for="badge in tool.badges" :key="badge" class="badge">
        {{ badge }}
      </li>
    </ul>

    <div class="mt-6 flex items-center justify-between gap-4">
      <a
        class="btn btn-secondary"
        :href="tool.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Open ${tool.title}`"
      >
        Open
        <ExternalLink class="h-4 w-4" aria-hidden="true" />
      </a>

      <span
        v-if="tool.featured"
        class="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/90"
      >
        Featured
      </span>
    </div>
  </article>
</template>
