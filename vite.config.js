export default {
    root: 'src/gruppe1/',
    publicDir: '../../static/',
    base: './',
    server:
    {
        host: true,
        open: true
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}