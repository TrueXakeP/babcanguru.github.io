'use strict';

const DOMPurify = require('dompurify');

const SVG_RE = /<svg ([^>]+)>/;
const DATA_TYPE_ATTR = 'data-type';
const TYPE_UGC = 'ugc';

//TODO: remove all the text-swizzling nastiness once we upgrade JSDOM to +12
const CAMEL_CASED_TAGS = [
    'animateColor',
    'animateTransform',
    'animateMotion',
    'linearGradient',
    'radialGradient',
    'clipPath',
    'altGlyph',
    'altGlyphItem',
    'glyphRef',
    'textPath',
    'altGlyphDef',
    'feDistantLight',
    'fePointLight',
    'feSpotLight',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feFlood',
    'feGaussianBlur',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'feSpecularLighting',
    'feTile',
    'feTurbulence',
    'feFuncA',
    'feFuncR',
    'feFuncG',
    'feFuncB'
];

function queryAttribute(markup, attr) {
    const re = new RegExp(`${attr}=("|')?([-\\w\\s,]+)\\1`);
    return markup.match(re);
}

function getAttribute(markup, attr) {
    const attribute = queryAttribute(markup, attr);

    return attribute ? attribute[2] : null;
}

function setAttribute(markup, attr, value) {
    const attribute = queryAttribute(markup, attr);

    if (attribute) {
        return markup.replace(attribute[2], value);
    }

    return markup.replace('<svg ', `<svg ${attr}="${value}" `);
}

/**
 * Needed for JSDOM < 12
 * @param {string} content
 * @return {string}
 */
function fixJSDOMTagCaseInsensitivity(content) {
    return CAMEL_CASED_TAGS.reduce((current, tag) => {
        const re = new RegExp(tag, 'ig');

        return current.replace(re, tag);
    }, content);
}

class Sanitizer {
    constructor() {
        this.hasRealDOM = typeof window !== 'undefined';
        this.purifier = DOMPurify;
    }
    /**
     * Takes a string of SVG and sanitize it to be consumable by Santa.
     *
     * @param {string} svg
     * @return {Object}
     */
    sanitizeSVG(svg) {
        // allow href attributes that reference ID's inside the document
        this.purifier.addHook('afterSanitizeAttributes', node => {
            if (node.hasAttribute('xlink:href') && !node.getAttribute('xlink:href').match(/^#/)) {
                node.removeAttribute('xlink:href');
            }
        });

        // sanitize
        let cleaned = this.purifier.sanitize(svg, {
            RETURN_DOM_FRAGMENT: this.hasRealDOM, // remove once we upgrade JSDOM to +12 and get full SVG support
            KEEP_CONTENT: false,
            USE_PROFILES: {
                svg: true,
                svgFilters: true
            },
            ADD_TAGS: ['use'],
            ADD_ATTR: ['filterUnits'] // remove once we update DOMPurify
        });

        // clean up
        this.purifier.removeHook('afterSanitizeAttributes');

        // get first <svg>
        let svgTag = this.hasRealDOM ? cleaned.querySelector('svg') : cleaned.match(SVG_RE);

        if (!svgTag) {
            // did not find an <svg>
            return {
                error: ''
            };
        }

        if (this.hasRealDOM) {
            // set data-type attribute
            svgTag.setAttribute(DATA_TYPE_ATTR, TYPE_UGC);

            cleaned = svgTag.outerHTML;
        } else {
            svgTag = svgTag[0];

            // set data-type attribute
            cleaned = fixJSDOMTagCaseInsensitivity(
                cleaned.replace(
                    svgTag,
                    setAttribute(svgTag, DATA_TYPE_ATTR, TYPE_UGC)
                )
            );
        }

        const error = this.validateSVG(svgTag);

        if (error) {
            return {
                error
            };
        }

        return {
            svg: cleaned
        };
    }

    /**
     * Validates an SVG follows Santa content restrictions and requirements.
     *
     * @param {SVGSVGElement|string} svg - SVG element or opening tag.
     */
    validateSVG(svg) {
        const isString = typeof svg === 'string';
        const width = isString ? getAttribute(svg, 'width') : svg.getAttribute('width');
        const height = isString ? getAttribute(svg, 'height') : svg.getAttribute('height');
        const viewBox = isString ? getAttribute(svg, 'viewBox') : svg.getAttribute('viewBox');

        if (viewBox || width && height) {
            // we have at least viewBox OR (width AND height), no problem
            return null;
        }

        return 'SVG does not have viewBox nor width and height';
    }
}

module.exports = new Sanitizer();