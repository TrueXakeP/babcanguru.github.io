'use strict'

module.exports = {
    UPLOADED_FONT_PREFIX: 'wf_',
    LONG_UPLOADED_FONT_PREFIX: 'wfont_',
    POSSIBLE_CHARACTERS_SETS: ['latin-ext', 'cyrillic', 'japanese', 'korean', 'arabic', 'hebrew', 'latin'],
    FONT_GROUPS: {
        'my-uploads': 'text_editor_font_dropdown_my_fonts',
        'latin': 'text_editor_font_dropdown_all_fonts',
        'latin-ext': 'add_languages_eastern_european',
        'cyrillic': 'add_languages_cyrillic',
        'japanese': 'add_languages_japanese',
        'korean': 'add_languages_korean',
        'arabic': 'add_languages_arabic',
        'hebrew': 'add_languages_hebrew'
    },
    LANG_TO_EXAMPLE_KEY: {
        'latin': '',
        'latin-ext': 'text_editor_font_example_latin_ext_constant',
        'cyrillic': 'text_editor_font_example_cyrillic_constant',
        'japanese': 'text_editor_text_editor_font_example_japanese_constant',
        'korean': 'text_editor_font_example_korean_constant',
        'arabic': 'text_editor_font_example_arabic_constant',
        'hebrew': 'text_editor_font_example_hebrew_constant'
    },
    HELVETICA_FALLBACK: 'HelveticaNeueW01-45Ligh, HelveticaNeueW02-45Ligh, HelveticaNeueW10-45Ligh, Helvetica Neue, Helvetica, Arial, メイリオ, meiryo, ヒラギノ角ゴ pro w3, hiragino kaku gothic pro, sans-serif'
}