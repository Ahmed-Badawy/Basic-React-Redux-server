var path = require('path');
var webpack = require('webpack');

const RFolders = {
	t: "Tests&Learning",
	f: "FinalProjects",
	u: "UnderDevelopment"
}


var webpackConfig = {

	entry: {
		vendor: ["babel-polyfill","react","react-dom","prop-types","axios","lodash.debounce","lodash.pickby"], 
		
		// AdvancedReactjs: [`./react/${RFolders.t}/AdvancedReactjs/main.js`],
		// RouterApp: [`./react/${RFolders.t}/RouterApp/main.js`],
		// BasicRedux: [`./react/${RFolders.t}/BasicRedux/main.js`],
		AdvancedRedux: [`./react/${RFolders.t}/AdvancedRedux/main.js`],

		// FuelCalc: [`./react/${RFolders.f}/FuelCalc/main.js`],
		// ConsumptionCalc: [`./react/${RFolders.f}/ConsumptionCalc/main.js`],
		// MoneyCalc: [`./react/${RFolders.f}/MoneyCalc/main.js`],
		// SocialId: [`./react/${RFolders.f}/SocialId/main.js`],
		// PhoneCreditCalc: [`./react/${RFolders.f}/PhoneCreditCalc/main.js`],

		// Finder: [`./react/${RFolders.u}/Finder/main.js`],
		// CourseTimer: [`./react/${RFolders.u}/CourseTimer/main.js`],
	}, 
	output: { 
		filename: "[name].js", 
		path: path.resolve(__dirname, 'public/js/build') 
	},

	devtool: "source-map",
	resolve: { modules: [ path.resolve("./"), path.resolve("./node_modules") ] }, //this will start dependency url resolving based on the basic url(./) ...

    module: { // Loaders apply transformations before a file is added to bundle.js
		loaders: [
			{
				test: /\.js$/, //transform all .js files
				exclude: /node_modules/, // except for node_modules
				loader: 'babel-loader', // apply the babel-loader to compile the files
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,				
				loader:[
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader", // compiles Sass to CSS, using Node Sass by default
				]
			 }
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor", filename: 'vendor.js'
		})
	]	

}
module.exports = webpackConfig;




// let ModulesArray = [];
// [


// 	{ModuleName:"Finder", ModuleFolder:"UnderDevelopment"},
// 	{ModuleName:"CourseTimer", ModuleFolder:"UnderDevelopment"},
// ].forEach(elm => {
// 	let entry_output_obj = { 
// 		entry: {
// 			vendor: ["babel-polyfill","react","react-dom","prop-types","axios","lodash.debounce","lodash.pickby"], 
// 			app: [`./react/${elm.ModuleFolder}/${elm.ModuleName}/main.js`]
// 		}, 
// 		output: { 
// 			filename: elm.ModuleName+"-[name].js", 
// 			path: path.resolve(__dirname, 'public/js/build') 
// 		} 
// 	};
// 	let project = Object.assign({}, config, entry_output_obj);
// 	ModulesArray.push(project);
// });
// module.exports = ModulesArray;


