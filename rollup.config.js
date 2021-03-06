import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import alias from "rollup-plugin-alias";

const umdGlobals = {
	react: "React",
	"prop-types": "propTypes",
};

export default [
	{
		input: "src/index.tsx",
		output: {
			name: "ReactAwesomePopover",
			file: "build/index.umd.js",
			format: "umd",
			globals: umdGlobals,
		},
		external: Object.keys(umdGlobals),
		plugins: [
			nodeResolve(),
			commonjs({ include: "**/node_modules/**" }),
			replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
			typescript(/*{ plugin options }*/),
			alias({
				react: "node_modules/react/umd/react.development.js",
				"react-dom": "./node_modules/react-dom/umd/react-dom.development.js",
			}),
			sizeSnapshot(),
		],
	},
];
