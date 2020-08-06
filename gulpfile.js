/* eslint-disable */

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');

const STATIC = 'static';
const STYLES = 'assets/styles/main.scss';
const IMAGES = 'assets/images/**/*';
const OTHER = 'assets/*.*';

gulp.task('styles', () => {
	return gulp.src(STYLES)
		.pipe(sass())
		.pipe(autoprefixer({ cascade: false }))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest(STATIC));
});

gulp.task('images', () => {
	return gulp.src(IMAGES)
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			gifsicle: true,
			svgo: true,
			concurrent: 10
	   	}))
	   	.pipe(gulp.dest(STATIC + '/images'));
});

gulp.task('other', () => {
	return gulp.src(OTHER)
	   	.pipe(gulp.dest(STATIC));
});

gulp.task('all', gulp.parallel(['styles', 'images', 'other']));
