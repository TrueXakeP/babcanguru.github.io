'use strict'


const matrixCalculations = {
    getItemPosition(itemIndex, itemWidth, itemHeight, margin, numCols) {
        const marginBetweenImages = margin
        const numberOfColumns = numCols
        const columnIndex = itemIndex % numberOfColumns
        const rowIndex = Math.floor((itemIndex - columnIndex) / numberOfColumns)

        return {
            left: columnIndex * (itemWidth + marginBetweenImages),
            top: rowIndex * (itemHeight + marginBetweenImages)
        }
    },

    /**
     *
     * @param {number} requestedRows
     * @param numCols
     * @param numItems
     * @returns {number}
     */
    getAvailableRowsNumber(requestedRows, numCols, numItems) {
        const calculatedNumOfRows = Math.ceil(numItems / numCols)
        return Math.min(requestedRows, calculatedNumOfRows)
    },

    getItemHeight(margin, height, numberOfRows, heightDiff) {
        const marginBetweenImages = margin
        const containerHeight = height - heightDiff
        return Math.max(Math.floor((containerHeight - (numberOfRows - 1) * marginBetweenImages) / numberOfRows), 0)
    },

    getItemWidth(margin, numCols, width, widthDiff) {
        const marginBetweenImages = margin
        const numberOfColumns = numCols
        const containerWidth = width - widthDiff
        return Math.max(Math.floor((containerWidth - (numberOfColumns - 1) * marginBetweenImages) / numberOfColumns), 0)
    },

    getImageStyle(height, width, imgHeight, imgWidth) {
        const isWiderThanContainer = imgWidth > width
        const isHigherThanContainer = imgHeight > height
        const newHeight = isWiderThanContainer ? '100%' : 'auto'
        const newWidth = isHigherThanContainer ? '100%' : 'auto'
        const imgLeft = isHigherThanContainer ? 0 : (width - imgWidth * (height / imgHeight)) / 2.0
        const imgTop = isWiderThanContainer ? 0 : (height - imgHeight * (width / imgWidth)) / 2.0
        return {
            'width': newWidth,
            'height': newHeight,
            'margin-top': imgTop,
            'margin-left': imgLeft
        }
    }
}
module.exports = matrixCalculations