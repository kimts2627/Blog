module.exports = {
  title: `개발새발`,
  description: `개발새발 적는 개발 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://like-gecko.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `김태수`,
    bio: {
      role: `프론트엔드 개발자`,
      description: ['도마뱀을 키우는', '볼더링을 좋아하는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
			github: `https://github.com/kimts2627`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/%ED%83%9C%EC%88%98-%EA%B9%80-6347ba20a/`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `like.gecko1@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.08 ~',
        activity: '클래스팅 프론트엔드 개발자',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
    ],
  },
};
