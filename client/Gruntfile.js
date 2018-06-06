/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function (grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /* Change these */
            width: 800,
            suffix: 'px',
            quality: 30
          },
          {
            /* Change these */
            width: 600,
            suffix: 'px',
            quality: 30
          },
          {
            /* Change these */
            width: 400,
            suffix: 'px',
            quality: 30
          }
          ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: './img-src/',
          dest: './dist/img/'
        }]
      }
    },
    copy: {
      icons: {
        cwd: './img-src/icons',
        src: '*.png',
        dest: './dist/img/icons',
        expand: true
      }
    },
    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['./dist/img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['./dist/img']
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'copy']);

};