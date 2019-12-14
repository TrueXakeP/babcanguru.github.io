const {
    getOverrides
} = require('../overrides');

function BaseService(_compsToPackages) {
    const compsToPackages = _compsToPackages;

    const overrides = getOverrides();

    function setWebpackPublicPath(baseUrl) {
        __webpack_public_path__ = `${baseUrl}/`; // eslint-disable-line
    }

    function loadComponent(componentType) {
        if (overrides[componentType]) {
            componentType = overrides[componentType].newComponentViewerType;
        }
        if (!exists(componentType)) {
            return Promise.reject(new Error(`no such component ${componentType}`));
        }
        return compsToPackages[componentType]()
            .catch(e => { //fix for ie11, doesn't load components
                console.error('coudn\'t load ' + componentType, e);
                return [{
                    default: {
                        componentType,
                        component: () => null,
                        santaComponent: () => null,
                        skin: {}
                    }
                }];
            });
    }

    function exists(componentType, runningExperiments) {
        return (!!compsToPackages[componentType] ||
            (overrides[componentType] && runningExperiments && runningExperiments[overrides[componentType].viewerExperimentKey] === 'new'));
    }

    function loadAll(baseUrl) {
        setWebpackPublicPath(baseUrl);
        return Promise.all(Object.keys(compsToPackages).map(loadComponent));
    }

    function load(componentType, baseUrl) {
        setWebpackPublicPath(baseUrl);
        return loadComponent(componentType);
    }

    return {
        exists,
        loadAll,
        load
    };
}

module.exports = BaseService;