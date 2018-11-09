var gulp = require("gulp");
var less = require("gulp-less");
var cssOptimization = require("gulp-csso");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("css", function() {
  return gulp.src("source/less/style.less")
    .pipe(less())
    .pipe(cssOptimization())
    .pipe(gulp.dest("build/css"));
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    watch: true,
    ui: false
  })

  gulp.watch("source/less/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("copy"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series("clean", "copy", "css"));
gulp.task("start", gulp.series("build", "server"));
