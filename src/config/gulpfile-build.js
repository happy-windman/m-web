const path = require('path')
const { src, dest, series, parallel } = require('gulp')

const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const cleanCSS=require('gulp-clean-css')//css压缩
const rev=require('gulp-rev')//md5编码
const revCollector=require('gulp-rev-collector')

// copyhtml
function copyhtml() {
  return src(['../../build/rev/**/*.json','../*.html'])
    .pipe(revCollector())
    .pipe(dest('../../build/'))
    .pipe(connect.reload())
}

// copylibs
function copylibs() {
  return src('../libs/**/*')
    .pipe(dest('../../build/libs'))
}

// copylibs
function copyassets() {
  return src('../assets/**/*')
    .pipe(dest('../../build/assets'))
}

// 编译sass
function packSCSS() {
  return src(['../styles/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(dest('../../build/styles'))  
    .pipe(rev.manifest())
    .pipe(dest('../../build/rev/styles/'))
    .pipe(connect.reload())
}

// JS模块化
function packJS() {
  return src('../scripts/app.js')
    .pipe(webpack({
      mode: 'production',
      entry: '../scripts/app.js',
      output: {
        path: path.resolve(__dirname, '../../build'),
        filename: 'app.js'
      },
      module: {
        rules: [
          {
            test: /\.html$/,
            loader: 'string-loader'
          },
          {
            test: /\.art$/,
            loader: "art-template-loader"
          }
        ]
      }
    }))
    .pipe(rev())
    .pipe(dest('../../build/scripts'))
    .pipe(rev.manifest())
    .pipe(dest('../../build/rev/scripts/'))
    .pipe(connect.reload())
}




exports.default = series(parallel(copyassets, copylibs, packSCSS, packJS),copyhtml)