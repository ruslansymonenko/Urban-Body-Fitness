import path, {dirname} from 'path';

const __dirname = path.resolve('./static/dist');

const config = {
    mode: 'development',
    entry: './static/src/js/script',
    output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
    },
    watch: true,

    devtool: "source-map",

    module: {}
};

export default config