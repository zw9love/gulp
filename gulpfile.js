/**
 * Created by zengwei on 2017/9/15
 */

// gulp.task('less', function () {
//     return gulp.src('./assets/less/demo.less')
//         .pipe(less({
//             paths: [ path.join(__dirname, 'less', 'includes') ]
//         }))
//         .pipe(gulp.dest('./assets/css/demo.css'));
// });


//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    path = require('path'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify')


gulp.task('connect', function () {
    connect.server({
        root: './',
        ip: 'localhost',
        livereload: true,
        port: 5555
    })
})


gulp.task('watch', function () {
    gulp.watch('./templates/*.html', ['html']);
    gulp.watch('./index.html', ['html']);
    // gulp.watch('./assets/less/*.less', ['less', 'compile-less']);
    gulp.watch('./assets/less/*.less', ['less']);
    gulp.watch('./assets/js/*.js', ['js']);
})

gulp.task('html', function () {
    gulp.src('./templates/*.html')
        .pipe(connect.reload())
    // .pipe(notify({message:'html重新编译完成'}))
    gulp.src('./index.html')
        .pipe(connect.reload())
    // .pipe(notify({message:'html重新编译完成'}))
});


gulp.task('js', function () {
    gulp.src('./assets/js/*.js')
        .pipe(connect.reload())
    // .pipe(notify({message:'js重新编译完成'}))
});


//定义一个compile-less任务（自定义任务名称）
gulp.task('less', function () {
    gulp.src('assets/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('assets/css')) //将会在assets/css/*.css
        .pipe(connect.reload())
    // .pipe(notify({message:'less重新编译完成'}))
});


// dev调试

// gulp.task('default', ['connect', 'watch']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('dev', ['connect', 'watch']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务


// 打包

// 清除输出文件夹
gulp.task('clean', function () {
    return gulp.src('webapp', {read: false}).pipe(clean())
})

gulp.task('html-css-js', ['clean'], function () {
    // 打包压缩合并js
    gulp.src('assets/js/*.js')
        .pipe(babel({
            presets: ['env']
        })) // ES6 => ES5
        .pipe(concat('app.js'))// 合并后的文件名
        .pipe(uglify())  // 先合并再压缩
        .pipe(gulp.dest('webapp/assets/js')) // 合并压缩之后再打包

    // 打包压缩合并css
    gulp.src('assets/css/*.css')
        .pipe(concat('app.css'))// 合并后的文件名
        .pipe(cssmin()) // 先合并再压缩
        .pipe(gulp.dest('webapp/assets/css')) // 合并压缩之后再打包

    // 打包压缩index.html
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true})) // 压缩
        .pipe(gulp.dest('webapp/')) // 压缩之后再打包

    // 打包压缩其他html
    gulp.src('templates/*.html')
        .pipe(htmlmin({collapseWhitespace: true})) // 压缩
        .pipe(gulp.dest('webapp/templates/')) // 压缩之后再打包
})

gulp.task('build', ['html-css-js'], function () {

    // // 打包压缩合并js
    // gulp.src('assets/js/*.js')
    //     .pipe(babel({
    //         presets: ['env']
    //     })) // ES6 => ES5
    //     .pipe(concat('app.js'))// 合并后的文件名
    //     .pipe(uglify())  // 先合并再压缩
    //     .pipe(gulp.dest('webapp/assets/js')); // 合并压缩之后再打包
    //
    // // 打包压缩合并css
    // gulp.src('assets/css/*.css')
    //     .pipe(concat('app.css'))// 合并后的文件名
    //     .pipe(cssmin()) // 先合并再压缩
    //     .pipe(gulp.dest('webapp/assets/css')); // 合并压缩之后再打包

    // 打包压缩img
    gulp.src('assets/img/*')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('webapp/assets/img'))
        .pipe(notify({message: 'webapp打包完成'}))

    // // 打包压缩index.html
    // gulp.src('index.html')
    //     .pipe(htmlmin({collapseWhitespace: true})) // 压缩
    //     .pipe(gulp.dest('webapp/')); // 压缩之后再打包
    //
    // // 打包压缩其他html
    // gulp.src('templates/*.html')
    //     .pipe(htmlmin({collapseWhitespace: true})) // 压缩
    //     .pipe(gulp.dest('webapp/templates/')); // 压缩之后再打包

});


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径