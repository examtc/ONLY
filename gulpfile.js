const gulp         = require("gulp");             //基于流的自动化创建工具
const webserver    = require("gulp-webserver");   //本地服务器
const express      = require("express");          //基于 Node.js 平台、快速、开放、极简的 Web 开发框架     
const babel        = require("gulp-babel");       //ES6编译成ES5 
const uglify       = require("gulp-uglify");      //压缩 JavaScript 
const sass         = require("gulp-sass");        //将Sass编译成 CSS
const csso         = require("gulp-csso");        //压缩 CSS
const autoprefixer = require("gulp-autoprefixer") //根据设置浏览器版本自动处理浏览器前缀
const https        = require("https")
const http         = require("http")


//编译、压缩JS文件到dist目录下
gulp.task("compileJS", ()=>{
	gulp.src("src/scripts/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/scripts") )
	gulp.src("src/pages/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/pages") )
	gulp.src("src/static/**/*").pipe( gulp.dest("dist/static") );
})
//编译、压缩SCSS文件到dist目录下
gulp.task("compileCSS", ()=>{
	gulp.src("src/styles/**/*.scss")
		.pipe( sass() )
		.pipe( autoprefixer() )
		.pipe( csso() )
		.pipe( gulp.dest("dist/styles") )
})
//复制HTML文件到dist目录下
gulp.task("compileHTML", ()=>{
	gulp.src("src/pages/**/*.html")
		.pipe( gulp.dest("dist/pages") )
})

gulp.task("compileJSON",()=>{
	gulp.src("src/json/**/*.json")
	.pipe(gulp.dest("dist/json"))
})

gulp.task("server", function(){
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe( webserver({
			livereload : true,
			port : 9999
		}) )
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"]);
	gulp.watch("src/json/**/*.json", ["compileJSON"])  
	
	//接口代理服务器
	let app = express();
	// 商品列表页左边栏数据 
	// https://cdn.bestseller.com.cn/classify/h5/ONLY/h5_list.json 
	app.get("/home", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cdn.bestseller.com.cn",
			path: "/classify/h5/ONLY/h5_list.json",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.get("/list1", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.only.cn",
			path: "/api/goods/dmpRecommendGoods?projectName=detailPage&brand=one&userId=&itemId=118149693J33&brandCode=ONLY",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	// 商品详情页图片信息
	// https://www.only.cn/api/goods/dmpRecommendGoods?projectName=firstPageHot&brand=one&userId=&itemId=&brandCode=ONLY
	app.get("/detail1", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		// console.log(res)
		// console.log(req)
		// var urlR = (req.query.design).substring(0,9);
		// console.log(urlR)
		let proxy = https.request({
			hostname: "www.only.cn",
			path: "/api/goods/dmpRecommendGoods?projectName=firstPageHot&brand=one&userId=&itemId=&brandCode=ONLY",
			method: 'get'
		}, (response) => { 
			response.pipe(res);
		});
		proxy.end();
	})
	// 商品详情数据
	// https://cdn.bestseller.com.cn/detail/ONLY/119201660.json
	app.get("/detail2", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		var urlR = (req.query.design).substring(0,9);
		// console.log(urlR)
		let proxy = https.request({
			hostname: "cdn.bestseller.com.cn",
			path: `/detail/ONLY/${urlR}.json`,
			method: 'get'
		}, (response) => { 
			response.pipe(res);
		});
		proxy.end();
	})
	app.get("/detail3", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		var urlR = (req.query.design).substring(0,9);
		console.log(urlR)
		let proxy = https.request({
			hostname: "cdn.bestseller.com.cn",
			path: `/detail/ONLY/${urlR}.json`,
			method: 'get'
		}, (response) => { 
			response.pipe(res);
		});
		proxy.end();
	})
	app.listen(8000);
})


gulp.task("build", ["compileJS","compileCSS","compileHTML","compileJSON"])