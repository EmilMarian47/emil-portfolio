```vue
<template>
  <div class="container py-8">
    <!-- Introduction -->
    <h1 class="font-mono text-base font-normal leading-6 mb-6">
      HOWDY PARTNER! 👋
    </h1>

    <div class="font-mono text-base font-normal leading-6 mb-10">
      <p>
        WELCOME TO MY DIGITAL SPACE. THIS IS WHERE I SHOWCASE MY WORKS AND INTERESTS. 5 YEARS OF INDUSTRY 
        EXPERIENCE IN SCULPTING DIGITAL PRODUCTS THAT TRANSFORM PEOPLE AND BUSINESS ONLINE. 
      </p>
    </div>

    <!-- Professional Experience -->
    <section class="w-full flex flex-col gap-6">
      <div>
        <div class="w-full pb-2 border-b border-gray border-dashed">
          <div class="text-fuchsia-500 text-base font-normal font-['Space_Mono'] leading-6">
            PROFESSIONAL EXPERIENCE
          </div>
        </div>
      </div>

      <div
        v-for="job in experience"
        :key="job.company"
        class="w-full flex flex-col justify-start items-start gap-1"
      >
        <div class="w-full min-h-6 flex justify-between items-start gap-4">
          <div class="text-neutral-100 text-base font-normal font-['Space_Mono'] leading-6">
            {{ job.role }}
          </div>

          <div class="text-zinc-500 text-base font-normal font-['Space_Mono'] leading-6 text-right shrink-0">
            {{ job.period }}
          </div>
        </div>

        <!-- Company -->
        <div class="text-neutral-200 text-base font-normal font-['Space_Mono'] leading-6">
          <a
            v-if="job.url"
            :href="job.url"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ job.company }}
          </a>

          <span v-else>
            {{ job.company }}
          </span>
        </div>

        <div class="w-full text-neutral-100 text-base font-normal font-['Space_Mono'] leading-6">
          {{ job.description }}
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="w-full flex flex-col gap-6 mt-10">
      <div>
        <div class="w-full pb-2 border-b border-gray border-dashed">
          <div class="text-fuchsia-500 text-base font-normal font-['Space_Mono'] leading-6">
            EDUCATION
          </div>
        </div>
      </div>

      <div
        v-for="item in education"
        :key="item.institution"
        class="w-full flex flex-col justify-start items-start gap-1"
      >
        <div class="w-full min-h-6 flex justify-between items-start gap-4">
          <div class="text-neutral-100 text-base font-normal font-['Space_Mono'] leading-6">
            {{ item.degree }}
          </div>

          <div class="text-zinc-500 text-base font-normal font-['Space_Mono'] leading-6 text-right shrink-0">
            {{ item.period }}
          </div>
        </div>

        <!-- University -->
        <div class="text-neutral-200 text-base font-normal font-['Space_Mono'] leading-6">
          <a
            v-if="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ item.institution }}
          </a>

          <span v-else>
            {{ item.institution }}
          </span>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="w-full flex flex-col gap-6 mt-10">
      <div>
        <div class="w-full pb-2 border-b border-gray border-dashed">
          <div class="text-fuchsia-500 text-base font-normal font-['Space_Mono'] leading-6">
            CERTIFICATIONS
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col justify-start items-start gap-3">
        <div
          v-for="certification in certifications"
          :key="certification.name"
          class="w-full min-h-6 flex justify-between items-start gap-4"
        >
          <div class="text-neutral-100 text-base font-normal font-['Space_Mono'] leading-6">
            {{ certification.name }}
            <span class="text-zinc-500">
              — {{ certification.provider }}
            </span>
          </div>

          <div class="text-zinc-500 text-base font-normal font-['Space_Mono'] leading-6 text-right shrink-0">
            {{ certification.year }}
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="w-full flex flex-col gap-6 mt-10 pb-10">
      <div>
        <div class="w-full pb-2 border-b border-gray border-dashed">
          <div class="text-fuchsia-500 text-base font-normal font-['Space_Mono'] leading-6">
            SKILLS
          </div>
        </div>
      </div>

      <div class="w-full flex flex-wrap gap-3">
        <div
          v-for="skill in skills"
          :key="skill"
          class="px-3 py-1 border border-gray border-dashed"
        >
          <div class="text-neutral-100 text-base font-normal font-['Space_Mono'] leading-6">
            {{ skill }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const experience = [
  {
    role: 'UI DESIGNER',
    period: '2024 — PRESENT',
    company: 'RED BATON',
    url: 'https://redbaton.digital/',
    description:
      'UI DESIGNER FOR THE CORE PLATFORM, OWNING END-TO-END FLOWS FROM RESEARCH THROUGH HI-FI DELIVERY. AC DICTUM PULVINAR FAUCIBUS VULPUTATE MATTIS INTERDUM NUNC.',
  },
  {
    role: 'VISUAL DESIGNER',
    period: '2022 — 2024',
    company: 'REXAV LLP',
    url: 'https://rexavllp.com',
    description:
      'SHIPPED A COMPONENT LIBRARY AND DESIGN TOKENS ADOPTED ACROSS FOUR PRODUCT TEAMS. ORCI MATTIS PELLENTESQUE LAOREET IN MAGNA TRISTIQUE.',
  },
  {
    role: 'UI DESIGNER',
    period: '2021 — 2022',
    company: 'STUDIO LORE',
    url: 'https://studiolore.in',
    description:
      'DESIGNED RESPONSIVE MARKETING SITES AND DASHBOARDS. TINCIDUNT LEO NUNC ALIQUAM ETIAM SED VIVERRA SED.',
  },
]

const education = [
  {
    degree: 'MSC, COMPUTER SCIENCE',
    period: '2018 — 2020',
    institution: 'MAHATMA GANDHI UNIVERSITY, KERALA',
    url: 'https://mgu.ac.in/',
  },
  {
    degree: 'BSC, COMPUTER APPLICATION',
    period: '2015 — 2018',
    institution: 'SACRED HEART COLLEGE, KERALA',
    url: 'https://shcollege.ac.in/',
  },
]

const certifications = [
  {
    name: 'NIELSEN NORMAN UX CERTIFICATION',
    provider: 'NN/G',
    year: '2022',
  },
  {
    name: 'GOOGLE UX DESIGN PROFESSIONAL',
    provider: 'COURSERA',
    year: '2020',
  },
  {
    name: 'CERTIFIED ACCESSIBILITY SPECIALIST',
    provider: 'IAAP',
    year: '2021',
  },
]

const skills = [
  'PRODUCT DESIGN',
  'DESIGN SYSTEMS',
  'USER RESEARCH',
  'PROTOTYPING',
  'FIGMA',
  'WIREFRAMING',
  'INTERACTION DESIGN',
  'HTML / CSS',
  'ACCESSIBILITY',
  'USABILITY TESTING',
  'MOTION DESIGN',
  'DESIGN TOKENS',
]
</script>
```
