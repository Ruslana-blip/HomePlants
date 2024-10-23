<template>
  <div class="blog__container">
    <h1>{{ selectedBlog?.title }}</h1>
    <div class="blog__img">
      <img :src="selectedBlog?.img" :alt="selectedBlog?.title" :title="selectedBlog?.title" />
    </div>
    <span class="blog__data">{{ selectedBlog?.data }}</span>
    <p class="blog__content">{{ selectedBlog?.header }}</p>
    <ul class="blog__list">
      <li class="blog__item" v-for="(section, index) in selectedBlog?.desc" :key="index">
        <span class="blog__number">{{ (index + 1).toString().padStart(2, '0') }}</span>
        <h3>{{ selectedBlog?.subtitles[index] }}</h3>
        <ul v-if="Array.isArray(section)">
          <li v-for="(item, idx) in section" :key="idx" class="blog__paragraf">{{ item }}</li>
        </ul>
        <p v-else>{{ section }}</p>
      </li>
    </ul>

    <div class="blog__conclusion">
      <span>Висновок:</span>
      <p>{{ selectedBlog?.conclusion }}</p>
    </div>
  </div>
  <TheSliderBlog :title="blogTitle" :slidesPerView="slidesPerView" />
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useBlogsStore } from '@/stores/blogs'
import TheSliderBlog from '@/components/slider/TheSliderBlog.vue'
export default {
  name: 'TheBlogSinglePage',
  components: {
    TheSliderBlog
  },
  data() {
    return {
      blogTitle: 'Інші новини',
      slidesPerView: 3
    }
  },
  computed: {
    ...mapState(useBlogsStore, ['selectedBlog'])
  },
  mounted() {
    this.getBlogById(this.$route.params.id)
  },
  watch: {
    '$route.params.id': 'fetchBlog'
  },
  methods: {
    ...mapActions(useBlogsStore, ['getBlogById']),
    fetchBlog() {
      const id = this.$route.params.id
      this.getBlogById(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  // .blog__container
  &__container {
    margin-top: 168px;
    margin-bottom: 280px;
    max-width: 1174px;
    color: $secondary-black;
    font-family: 'Lato';
    h1 {
      text-align: center;
      font-size: font-rem(40);
      font-weight: 400;
      text-transform: uppercase;
      font-family: 'Georgia';
    }
  }
  // .blog__img
  &__img {
    margin: 24px 0;
    width: 100%;
    height: 520px;
    border-radius: 24px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  // .blog__data
  &__data {
    color: $grey;
  }
  // .blog__content
  &__content {
    font-size: font-rem(18);
    margin: 72px 0;
  }
  // .blog__list
  &__list {
    display: flex;
    flex-wrap: wrap;
    row-gap: 56px;
    column-gap: 72px;
    margin-bottom: 72px;
  }
  &__number {
    font-size: font-rem(40);
    font-family: 'Georgia';
    font-weight: 400;
  }

  // .blog__item
  &__item {
    flex: 1 1 calc(50% - 72px);
    font-size: font-rem(18);
    & h3 {
      font-size: font-rem(24);
      font-weight: 700;
      margin: 24px 0;
    }
  }
  &__paragraf {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
  // .blog__conclusion
  &__conclusion {
    & span {
      font-size: font-rem(24);
      font-weight: 700;
    }
    & p {
      font-size: font-rem(18);
      margin-top: 16px;
    }
  }
}
</style>
