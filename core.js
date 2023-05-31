let trashPhrases = [
    'Крайний срок:',
    'ваша эффективность будет снижена.',
    'Завершите задачу или передвиньте срок.'
]

$(document).on('click', '.bx-im-notifications-header-image', () => {
    let ids = []
    let interval = 0
    console.log('kill tasks')
    $('.bx-im-notifications-item').each((index, item) => {
        let $item = $(item)
        let url = $item.find('.bx-im-notifications-item-link').attr('href')
        let taskId = /view\/(\d+)\//.exec(url)[1]
        let subtitleText = $item.find('.bx-im-notifications-item-bottom-no-subtitle-text').text()
        let isTrash = trashPhrases.some(phrase => subtitleText.includes(phrase))
        if (ids.includes(taskId) || isTrash) {
            $item.css('background', 'red')
            setTimeout(() => {
                $item.find('.bx-im-notifications-item-header-delete').click()
            }, interval)
            interval += 200
        }
        ids.push(taskId)
    })
})