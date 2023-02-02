module.exports = {
    apps: [
        {
            name: 'margrave-api',
            script: '/usr/bin/npm',
            args: 'start',
            cwd: './apps/api',
            namespace: 'margrave',
            env: {
                PORT: 9867,
            },
        },
        {
            name: 'margrave-web',
            script: 'build/index.js',
            cwd: './apps/web',
            namespace: 'margrave',
            env: {
                PORT: 9866,
            },
        },
    ],
}
