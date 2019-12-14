module.exports = (isCurrentlyMobileView, setForceMobileView, setAllPageRawContent, setPlatformCounter, platformCounter, shouldBeMobileView) => {
    if (isCurrentlyMobileView !== shouldBeMobileView) {
        setForceMobileView(shouldBeMobileView)
        setAllPageRawContent({})
        setPlatformCounter(platformCounter)
    }
}