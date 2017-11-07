var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    es = require('event-stream'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    jshint = require('jshint'),
    stylish = require('jshint-stylish');

var DEST = 'build/';

/**
	jshint: { It look for js errors and show it up }
	{ Busca errores de javascript y los muestra por pantalla }
	*/
gulp.task('jshint', function() {
	return gulp.src('./app/scripts/**/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

/**
	server: { It creates a web server for the project }
	{ Crea un Servidor web para el ambiente de desarrollo }
	*/
gulp.task('server', function() {
	connect.server({
		root: 'app',
		hostname: '0.0.0.0',
		port: 8085,
		livereload: true
	});
});

/**
	inject: { It search on css and js folders to inject new files on index.html }
	{ Busca en las carpetas de estilos y scripts, archivos nuevos para inyectarlos
 	en index.html }
	*/
gulp.task('inject', function () {
	var target = gulp.src('./app/index.html');
	// It's not necessary to read the files (will speed up things), we're only after their paths:
	var sources = gulp.src([ './app/scripts/**/*.js',
	'./app/stylesheets/**/*.css',
	'./app/directives/**/*.js' ], {read: false});

  return target.pipe(inject(sources, {
		ignorePath: '/app'
	}))
		.pipe(gulp.dest('./app'));
});

/**
	wiredep: { It will install all Bower libraries on ./app/lib }
	{ Instala todas las librerías de Bower en ./app/lib }
 */
gulp.task('wiredep', function () {
	gulp.src('./app/index.html')
	.pipe(wiredep({
		directory: 'app/lib',
		bowerJson: require('./bower.json'),
	}))
	.pipe(gulp.dest('./app'));
});

/**
	html: { It reloads the browser when HTML files change }
	{ Recarga el navegador cuando hay cambios en archivos HTML }
 */
gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(connect.reload());
});

/**
	watch: { It look for changes and rerun relationed tasks }
	{ Vigila cambios y lanza las tareas relacionadas }
 */
gulp.task('watch', function() {
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
	gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint']);
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/helpers/*.js',
        'src/js/*.js',
      ])
      .pipe(concat('custom.js'))
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function (filename, options) {
  return sass('src/scss/*.scss', options)
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST+'/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass', function() {
    return compileSASS('custom.css', {});
});

gulp.task('sass-minify', function() {
    return compileSASS('custom.min.css', {style: 'compressed'});
});

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         },
//         startPath: './index.html'
//     });
// });

// gulp.task('watch', function() {
//   // Watch .html files
//   gulp.watch('app/views/*.html', browserSync.reload);
//   // Watch .js files
//   gulp.watch('src/js/*.js', ['scripts']);
//   // Watch .scss files
//   gulp.watch('src/scss/*.scss', ['sass', 'sass-minify']);
// });

// Default Task
gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
