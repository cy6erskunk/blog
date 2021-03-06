module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      compass: {
        files: ['src/styles/**'],
        tasks: ['compass']
      },
      pages: {
        files: ['src/pages/**', 'posts/**', 'src/layouts/**'],
        tasks: ['pages']
      },
      copy: {
        files: ['src/images/**', 'src/styles/**.css', 'src/styles/fonts/**', 'src/scripts/**'],
        tasks: ['copy']
      }
    },
    pages: {
      options: {
        pageSrc: 'src/pages'
      },
      posts: {
        src: 'posts',
        dest: 'dist',
        layout: 'src/layouts/post.jade',
        url: 'blog/posts/:posturl/',
        options: {
          templateEngine: 'jade',
          pagination: {
            postsPerPage: 3,
            listPage: 'src/pages/index.jade'
          }
        }
      }
    },
    connect: {
      dist: {
        options: {
          port: 5455,
          hostname: 'localhost',
          base: 'dist/',
          livereload: true,
          open: 'http://localhost:5455'
        }
      }
    },
    clean: {
      dist: 'dist'
    },
    compass: {
      options: {
        sassDir: 'src/styles',
        cssDir: 'dist/styles'
      },
      dist: {}
    },
    // Move files not handled by other tasks
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            'images/**',
            'styles/**.css',
            'styles/fonts/**',
            'scripts/**',
            'CNAME'
          ]
        }]
      }
    },
    'gh-pages': {
      options: {
        base: 'dist',
        push: true
      },
      src: ['CNAME', '*.html', 'blog/posts/*.html', 'styles/**/*', 'page/**/*', 'images/**/*', 'scripts/**']
  }
  });

  grunt.registerTask('build', [
    'clean',
    'compass',
    'pages',
    'copy'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', 'server');
};
