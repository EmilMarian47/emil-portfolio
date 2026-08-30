<template>
  <div class="container py-8">
    <!-- Introduction -->
    <h1 class="font-mono text-base font-normal leading-6 mb-6">
      Howdy Partner! 👋
    </h1>

    <div class="font-mono text-base font-normal leading-6 mb-10">
      <p>
        Welcome to my digital space. This is where I showcase my works and interests. 5 years of industry 
        experience in sculpting digital products that transform people and business online. 
      </p>
    </div>

    <!-- Professional Experience -->
    <section class="w-full flex flex-col gap-6">
      <div>
        <div class="w-full pb-2 border-b border-gray border-dashed">
          <div class="text-fuchsia-500 text-base font-normal font-['Space_Mono'] leading-6">
            Professional Experience
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
            Education
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
            Certifications
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
            Skills
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
    role: 'UI Designer',
    period: '2024 — Present',
    company: 'Red Baton',
    url: 'https://redbaton.digital/',
    description:
      'UI designer for the core platform, owning end-to-end flows from research through hi-fi delivery. Ac dictum pulvinar faucibus vulputate mattis interdum nunc.',
  },
  {
    role: 'Visual Designer',
    period: '2022 — 2024',
    company: 'Rexav LLP',
    url: 'https://rexavllp.com',
    description:
      'Shipped a component library and design tokens adopted across four product teams. Orci mattis pellentesque laoreet in magna tristique.',
  },
  {
    role: 'UI Designer',
    period: '2021 — 2022',
    company: 'Studio Lore',
    url: 'https://studiolore.in',
    description:
      'Designed responsive marketing sites and dashboards. Tincidunt leo nunc aliquam etiam sed viverra sed.',
  },
]

const education = [
  {
    degree: 'MSc, Computer Science',
    period: '2018 — 2020',
    institution: 'Mahatma Gandhi University, Kerala',
    url: 'https://mgu.ac.in/',
  },
  {
    degree: 'BSc, Computer Application',
    period: '2015 — 2018',
    institution: 'Sacred Heart College, Kerala',
    url: 'https://shcollege.ac.in/',
  },
]

const certifications = [
  {
    name: 'Nielsen Norman UX Certification',
    provider: 'NN/g',
    year: '2022',
  },
  {
    name: 'Google UX Design Professional',
    provider: 'Coursera',
    year: '2020',
  },
  {
    name: 'Certified Accessibility Specialist',
    provider: 'IAAP',
    year: '2021',
  },
]

const skills = [
  'Product Design',
  'Design Systems',
  'User Research',
  'Prototyping',
  'Figma',
  'Wireframing',
  'Interaction Design',
  'HTML / CSS',
  'Accessibility',
  'Usability Testing',
  'Motion Design',
  'Design Tokens',
]
</script>
