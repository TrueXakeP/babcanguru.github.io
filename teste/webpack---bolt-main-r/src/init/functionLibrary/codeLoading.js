module.exports = ({
    fetchFunction,
    requireFunction,
    biReporter,
    logger
}) => {
    const fetch = async (url, options, dataType, onSuccess, onError) => {
        const reportId = biReporter.reportActionStart('fetch', url)

        let res
        try {
            res = await fetchFunction(url, options, dataType)
            biReporter.reportActionEnd(reportId)
        } catch (errorOrResponse) {
            if (onError) {
                onError(errorOrResponse)
                return
            }

            const e = errorOrResponse instanceof Response ?
                new Error(`Fetch failed. Status: ${errorOrResponse.status}. Reason: ${errorOrResponse.statusText}.`) :
                errorOrResponse

            const failedRequestUrl = url.split('?')[0]
            logger.enrichError(e, {
                tags: {
                    failedRequestUrl
                },
                extra: {
                    failedRequest: {
                        url,
                        options,
                        dataType
                    }
                },
                fingerprint: [failedRequestUrl]
            })

            throw e
        }

        onSuccess(res)
    }

    return {
        fetch,

        getRequireUrl: packageName => requireFunction.toUrl(packageName),

        requireFn: (packageName, callback) => {
            requireFunction([packageName], result => {
                callback(result || packageName)
            }, err => {
                console.warn('require failure', err)
            })
        },
        requireSync: packageName => requireFunction(packageName),
        requirePackageCallback: (setLoadedPackage, packageName, packageValue = true) => {
            setLoadedPackage(packageName, packageValue)
        },
        requireTPANativeCode: (url, callback) => {
            requireFunction([url], callback, callback)
        }
    }
}