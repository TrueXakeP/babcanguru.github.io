import {
    resourceHints,
    resourceHintsExtra
} from './resource-hints'
const CHUNK_NAMES = ['init', 'animations']

export const loadBootstrapPackages = (experimentInst, requirejs) => {
    const bootstrapPackages = {}

    if (experimentInst.isOpen('bv_initialize_host_instance_with_warmup_utils')) {
        const rjsContext = requirejs.s.contexts._
        const originalRjsNextTick = rjsContext.nextTick.bind(rjsContext) // originalRjsNextTick: cb => setTimeout(cb, 4)
        rjsContext.nextTick = cb => cb() // in order to issue the command to fetch warmupUtils before fetching chunks

        requirejs([
            'warmupUtils',
            // warmupUtils dependencies
            'lodash',
            'zepto',
            'experiment',
            'warmupUtilsLib',
            'image-client-api',
            'wix-ui-santa/dataRefs.bundle'
        ], warmupUtils => {
            bootstrapPackages.warmupUtils = warmupUtils
        })

        rjsContext.nextTick = originalRjsNextTick
    }

    return bootstrapPackages
}

export const generateResourceHints = (context, boltBase, rendererModel, serviceTopology, requirejs) => {
    resourceHints(CHUNK_NAMES, context, boltBase, rendererModel, serviceTopology, requirejs)
}

export const generateExtraResourceHints = (context, requirejs, experimentInst) => {
    resourceHintsExtra(context, requirejs, experimentInst)
}