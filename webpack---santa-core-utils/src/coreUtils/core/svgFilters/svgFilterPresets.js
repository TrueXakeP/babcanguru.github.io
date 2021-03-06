'use strict'

const filterPresets = {
    normal: [{
        key: 'identity',
        inAttr: 'SourceGraphic'
    }],
    ink: [{
            key: 'sepia',
            value: 0.3
        },
        {
            key: 'contrast',
            value: 1.5
        },
        {
            key: 'brightness',
            value: 1.1
        },
        {
            key: 'saturation',
            value: 0
        }
    ],
    kennedy: [{
            key: 'saturation',
            value: 0
        },
        {
            key: 'contrast',
            value: 1.1
        },
        {
            key: 'brightness',
            value: 0.9
        }
    ],
    feathered: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#171212'
        }
    ],
    blur: [{
        key: 'blur',
        value: 2
    }],
    whistler: [{
            key: 'color',
            value: '#ffffff',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'alpha',
            value: 0.4,
            inAttr: 'color',
            result: 'flood_alpha'
        },
        {
            key: 'blur',
            value: 1.8,
            inAttr: 'srcRGB'
        },
        {
            key: 'alpha',
            value: 0.6,
            result: 'blur_alpha'
        },
        {
            key: 'blend',
            value: 'normal',
            inAttr: 'blur_alpha',
            in2Attr: 'srcRGB',
            result: 'source_blur'
        },
        {
            key: 'blend',
            value: 'overlay',
            inAttr: 'flood_alpha',
            in2Attr: 'source_blur'
        },
        {
            key: 'brightness',
            value: 1.1
        },
        {
            key: 'contrast',
            value: 0.9
        },
        {
            key: 'saturation',
            value: 0.6
        }
    ],
    '3d': [{
            key: 'color',
            value: '#00ffff',
            inAttr: 'srcRGB',
            result: 'color1'
        },
        {
            key: 'blend',
            value: 'lighten',
            inAttr: 'color1',
            in2Attr: 'srcRGB',
            result: 'image_color1'
        },
        {
            key: 'offset',
            value: {
                x: -3,
                y: 0
            },
            inAttr: 'image_color1',
            result: 'image_color1_offset'
        },
        {
            key: 'color',
            value: '#ff0000',
            inAttr: 'srcRGB',
            result: 'color2'
        },
        {
            key: 'blend',
            value: 'lighten',
            inAttr: 'color2',
            in2Attr: 'srcRGB',
            result: 'image_color2'
        },
        {
            key: 'offset',
            value: {
                x: 3,
                y: 0
            },
            inAttr: 'image_color2',
            result: 'image_color2_offset'
        },
        {
            key: 'blend',
            value: 'darken',
            inAttr: 'image_color1_offset',
            in2Attr: 'image_color2_offset'
        }
    ],
    blueray: [{
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#1b00ff',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color',
            in2Attr: 'grayscale'
        }
    ],
    lighten: [{
            key: 'color',
            value: '#ffffff',
            inAttr: 'srcRGB',
            result: 'color'
        },
        {
            key: 'alpha',
            value: 0.46,
            inAttr: 'color',
            result: 'color_alpha'
        },
        {
            key: 'composite',
            value: 'over',
            inAttr: 'color_alpha',
            in2Attr: 'srcRGB'
        }
    ],
    darken: [{
            key: 'brightness',
            value: 0.4,
            result: 'brightness'
        },
        {
            key: 'blend',
            value: 'darken',
            inAttr: 'brightness',
            in2Attr: 'SourceGraphic'
        }
    ],
    pinkrinse: [{
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#9a1a77',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    redrum: [{
            key: 'contrast',
            value: 0.75
        },
        {
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#f26552',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    greenwash: [{
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#1c9784',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color',
            in2Attr: 'grayscale'
        }
    ],
    yellowstreak: [{
            key: 'contrast',
            value: 2
        },
        {
            key: 'brightness',
            value: 1.1
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#ffd200',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    neonsky: [{
            key: 'contrast',
            value: 0.8
        },
        {
            key: 'duotone',
            value: {
                dark: '#800033',
                light: '#fff200'
            }
        },
        {
            key: 'luma',
            value: {
                dark: {
                    r: 0,
                    g: -0.1,
                    b: 0
                },
                light: {
                    r: 1.2,
                    g: 0,
                    b: 0
                }
            }
        }
    ],
    seaweed: [{
        key: 'duotone',
        value: {
            dark: '#0b00e9',
            light: '#00d980'
        }
    }],
    soledad: [{
            key: 'brightness',
            value: 1.1
        },
        {
            key: 'contrast',
            value: 0.9
        },
        {
            key: 'saturation',
            value: 0.8,
            result: 'saturation'
        },
        {
            key: 'color',
            value: '#fce8d3',
            inAttr: 'SourceGraphic',
            result: 'color1'
        },
        {
            key: 'alpha',
            value: 0.15,
            inAttr: 'color1',
            result: 'color_alpha'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color_alpha',
            in2Attr: 'saturation',
            result: 'source'
        },
        {
            key: 'color',
            value: '#fc9f1a',
            inAttr: 'SourceGraphic',
            result: 'color2'
        },
        {
            key: 'alpha',
            value: 0.23,
            inAttr: 'color2',
            result: 'color_alpha2'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color_alpha2',
            in2Attr: 'source'
        }
    ],
    sangria: [{
            key: 'brightness',
            value: 0.95
        },
        {
            key: 'contrast',
            value: 1.35
        },
        {
            key: 'saturation',
            value: 0.5,
            result: 'saturation'
        },
        {
            key: 'color',
            value: '#c712e2',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'alpha',
            value: 0.08,
            inAttr: 'color',
            result: 'color_alpha'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color_alpha',
            in2Attr: 'saturation',
            result: 'source'
        }
    ],
    malibu: [{
            key: 'contrast',
            value: 0.8
        },
        {
            key: 'duotone',
            value: {
                dark: '#0045d6',
                light: '#ffdbc0'
            }
        }
    ],
    candyfloss: [{
            key: 'contrast',
            value: 0.8
        },
        {
            key: 'duotone',
            value: {
                dark: '#ff0000',
                light: '#ff9bff'
            }
        }
    ],
    elmo: [{
            key: 'contrast',
            value: 0.8
        },
        {
            key: 'duotone',
            value: {
                dark: '#ff0000',
                light: '#cadccc'
            }
        }
    ],
    unicorn: [{
            key: 'contrast',
            value: 0.8
        },
        {
            key: 'duotone',
            value: {
                dark: '#409ca5',
                light: '#dfb1bd'
            }
        }
    ],
    kerouac: [{
        key: 'duotone',
        value: {
            dark: '#37312e',
            light: '#b5a8a2'
        }
    }],
    koolaid: [{
        key: 'duotone',
        value: {
            dark: '#5f00ad',
            light: '#fdcec1'
        }
    }],
    hydra: [{
        key: 'duotone',
        value: {
            dark: '#f72b3e',
            light: '#ffeced'
        }
    }],
    pixie: [{
        key: 'duotone',
        value: {
            dark: '#85d3de',
            light: '#ffe1d5'
        }
    }],
    nightrain: [{
        key: 'duotone',
        value: {
            dark: '#2f3c6d',
            light: '#8e96b5'
        }
    }],
    bauhaus: [{
        key: 'duotone',
        value: {
            dark: '#002787',
            light: '#e8e8e8'
        }
    }],
    neptune: [{
        key: 'duotone',
        value: {
            dark: '#0a7eff',
            light: '#e5defa'
        }
    }],
    orca: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#2b524c'
        }
    ],
    manhattan: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#211c0f'
        }
    ],
    goldie: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#a6966e'
        }
    ],
    flamingo: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#ff4283'
        }
    ],
    faded: [{
            key: 'saturation',
            value: 0.2
        },
        {
            key: 'contrast',
            value: 0.85
        },
        {
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'tint',
            value: '#dcdddc'
        }
    ],
    gotham: [{
            key: 'brightness',
            value: 0.95
        },
        {
            key: 'contrast',
            value: 1.35
        },
        {
            key: 'saturation',
            value: 0.5,
            result: 'saturation'
        },
        {
            key: 'color',
            value: '#93676f',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'alpha',
            value: 0.08,
            inAttr: 'color',
            result: 'color_alpha'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'color_alpha',
            in2Attr: 'saturation',
            result: 'source'
        }
    ],
    hulk: [{
            key: 'contrast',
            value: 0.75
        },
        {
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#b5c900',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    midnight: [{
            key: 'contrast',
            value: 0.75
        },
        {
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#00254b',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    lucille: [{
            key: 'contrast',
            value: 0.75
        },
        {
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#d60000',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    organic: [{
            key: 'contrast',
            value: 0.75
        },
        {
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'saturation',
            value: 0,
            result: 'grayscale'
        },
        {
            key: 'color',
            value: '#debda5',
            inAttr: 'SourceGraphic',
            result: 'color'
        },
        {
            key: 'blend',
            value: 'multiply',
            inAttr: 'grayscale',
            in2Attr: 'color'
        }
    ],
    grayscale: [{
            key: 'brightness',
            value: 1
        },
        {
            key: 'contrast',
            value: 1
        },
        {
            key: 'duotone',
            value: {
                dark: '#000000',
                light: '#ffffff'
            }
        }
    ],
    tvDuotone: [{
            key: 'brightness',
            value: 0.9
        },
        {
            key: 'contrast',
            value: 1.5
        },
        {
            key: 'duotone',
            value: {
                dark: '@color_23',
                light: '@color_18'
            }
        }
    ],
    tvMonotoneDark: [{
            key: 'brightness',
            value: 1.2
        },
        {
            key: 'contrast',
            value: 1
        },
        {
            key: 'duotone',
            value: {
                dark: '#000000',
                light: '@color_8'
            }
        }
    ],
    tvMonotoneLight: [{
            key: 'brightness',
            value: 1
        },
        {
            key: 'contrast',
            value: 1
        },
        {
            key: 'duotone',
            value: {
                dark: '@color_8',
                light: '#ffffff'
            }
        }
    ],
    tvHue: [{
            key: 'hue',
            value: -60
        },
        {
            key: 'saturation',
            value: 1
        }
    ]
}

module.exports = filterPresets