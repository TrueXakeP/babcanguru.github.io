module.exports = {
    isExperimentOpen: (runningExperiments, experimentName) => {
        const value = runningExperiments[experimentName.toLowerCase()]
        return !!(value && value !== 'old' && value !== 'false')
    },
    getExperimentValue: (runningExperiments, experimentName) => runningExperiments[experimentName.toLowerCase()]
}