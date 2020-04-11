const clientConfig = {
    development: 'http://localhost:3000',
    production: 'https://bsl-balance.now.sh'
}
process.env.baseUrl = process.env.NODE_ENV === 'production' ? clientConfig.production : clientConfig.development
