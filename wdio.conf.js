exports.config = {
    runner: 'local',
    specs: [
        './src/selenium/*.js'
    ],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome'
        }
    ],
    logLevel: 'info',
    coloredLogs: true,
    screenshotPath: './selenium/logs/',
    baseUrl: 'http://localhost:3000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
