var gulp         = require ('gulp'),
	sass         = require ('gulp-sass'),
	minifyCss    = require ('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	nodemon      = require ('gulp-nodemon'),
	browserSync  = require('browser-sync').create(),
	config       = require('./config.js');


// Tarea de sass
gulp.task('sass', function () {
	// Recurso a leer para la tarea
	gulp.src('./dev/css/*.scss')
        // .pipe(sourcemaps.init())
		// Compila el SASS
		.pipe(sass())
        // .pipe(sourcemaps.write('.'))
		// Destino de compilación y minificación
		.pipe(gulp.dest('./public/css/'))
	    // Agrega prefijos
		.pipe(autoprefixer())
		// Minífica CSS
		.pipe(minifyCss())
		.pipe(gulp.dest('./public/css/'));
});

// Tarea estilos minifica los css después de compilar los sass
// gulp.task('css', ['sass'], function () {
//     gulp.src('./public/css/**/*.css')
//         // Agrega prefijos
//         .pipe(autoprefixer())
// 		// Minífica CSS
// 		.pipe(minifyCss())
//         .pipe(gulp.dest('./public/css/'));
// })

gulp.task('watch', function () {
	gulp.watch('./dev/css/*.scss',['sass']);
});

// Tarea que controla el servidor. start y restart. Nodemon
gulp.task('serve', function (cb) {
	var inicio = false;

	return nodemon({
		script: 'server.js',
		ext: 'js html',
		env: { 'NODE_ENV': 'development' },
		watch: ['server.js', 'gulpfile.js', 'config.js', 'api/**/*.*']
	})
	.on('start', function onStart () {
		if(!inicio){
			cb();
		}

		inicio = true;
	})
	.on('restart', function onRestart () {
		setTimeout(function reload () {
			browserSync.reload({stream : false});
		}, 500);
	})

});

// Tarea de BrowserSync
gulp.task('bsync', ['serve'], function () {
	browserSync.init(null, {
		proxy: 'http://localhost:'+config.port,
		port: 1234,
		files: ["./public/**/*.*"],
		ghostMode: true,
		browser: "google chrome"
	});
})
gulp.task('default', ['serve']);
gulp.task('dev', ['bsync','sass', 'watch']);