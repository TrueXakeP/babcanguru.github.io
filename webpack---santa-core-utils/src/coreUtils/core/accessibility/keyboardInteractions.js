'use strict'


function activateBySpaceButton(evt) {
    const $ = require('zepto')
    if (evt.key === ' ') {
        evt.preventDefault()
        evt.stopPropagation()
        $(evt.target).click()
    }
}

function activateBySpaceOrEnterButton(evt) {
    const $ = require('zepto')
    if (evt.key === 'Enter') {
        evt.preventDefault()
        evt.stopPropagation()
        $(evt.target).click()
        return
    }
    activateBySpaceButton(evt)
}

module.exports = {
    activateBySpaceButton,
    activateBySpaceOrEnterButton
}