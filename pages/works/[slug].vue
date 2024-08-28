<template>
  <div class="container py-8">
    <ContentDoc v-slot="{ doc }">
      <div class="content pb-16 border-b border-[#000000]">
        <div class="text-[#00000080] text-sm font-mono mb-6">
          <nuxt-link to="/works">{{ doc._path }}</nuxt-link>
        </div>

        <div class="flex gap-3 items-center mb-9">
          <nuxt-link to="/works"><img src="~/assets/icons/arrow-left.svg" class="size-6" alt="Back"></nuxt-link>
          <h1 class="text-2xl">{{ doc.title }}</h1>
        </div>

        <article class="mb-8">
          <ContentRenderer :value="doc" />
        </article>

        <!-- Upvote/Downvote -->
        <div class="flex justify-between items-center font-mono">
          <button @click="handleVote('upvote')" class="text-green-500 flex">
            Upvote (<span>{{ upvotes }}</span>)
          </button>
          <button @click="handleVote('downvote')" class="text-red-500 flex">
            Downvote (<span>{{ downvotes }}</span>)
          </button>
        </div>
      </div>


      <div class="py-16">
        <div class="flex gap-2 justify-between mb-11">
          <h4 class="text-2xl">More Projects</h4>
          <NuxtLink to="/works" class="text-lg text-[#A000AE] font-mono underline underline-offset-2">View All
          </NuxtLink>
        </div>
        <ContentList path="/works" v-slot="{ list }">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <template v-for="work in list" :key="work._path">
              <nuxt-link v-if="doc._path !== work._path" :to="work._path" class="group flex gap-5">
                <div class="flex size-36 bg-[#D9D9D9]"></div>
                <div class="pt-5 flex gap-1 flex-col">
                  <h5 class="font-mono text-black group-hover:underline">{{ work.title }}</h5>
                  <p class="font-mono italic text-[#787878]">{{ work.type }}</p>
                </div>
              </nuxt-link>
            </template>
          </div>
        </ContentList>
      </div>

    </ContentDoc>

  </div>
</template>

<style>
  article img {
    @apply w-full
  }

  .Toastify__toast {
    @apply border border-[#bcbcbc] rounded-none
  }

  .Toastify__progress-bar {
    @apply hidden
  }
</style>


<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const supabase = useSupabaseClient()
const route = useRoute();
const slug = route.params.slug;
const userCookie = useCookie('user_id');
const upvotes = ref(0);
const downvotes = ref(0);

const getUserId = () => {
  if (!userCookie.value) {
    userCookie.value = crypto.randomUUID(); // Generate a unique user ID
  }
  return userCookie.value;
};

const fetchVotes = async () => {
  const { data: votes, error } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('work_id', slug);

  // Compute vote counts
  upvotes.value = votes.filter(vote => vote.vote_type === 'upvote').length;
  downvotes.value = votes.filter(vote => vote.vote_type === 'downvote').length;
};

const handleVote = async (voteType) => {
  const userId = getUserId();

  // Check if user has already voted
  const { data: existingVote, error: fetchError } = await supabase
    .from('votes')
    .select('user_id')  // Select the 'user_id' column
    .eq('user_id', userId)  // Match the user_id condition
    .eq('work_id', slug)    // Match the work_id condition
    .limit(1);              // Limit the query to one row

  if (existingVote && existingVote.length > 0) {
    toast("Already voted!", {
      "theme": "auto",
      "type": "warning",
      "dangerouslyHTMLString": true,
      "limit": 1,
    })
    return;
  }

  // Insert vote into database
  const { error: insertError } = await supabase
    .from('votes')
    .insert({ user_id: userId, work_id: slug, vote_type: voteType });

  if (insertError) {
    // console.error('Error inserting vote:', insertError);
    return;
  }

  // Update local counts
  if (voteType === 'upvote') {
    upvotes.value++;
  } else {
    downvotes.value++;
  }
};


onMounted(() => {
  fetchVotes();
});
</script>