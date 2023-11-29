let trashPhrases = [
    'Крайний срок:',
    'ваша эффективность будет снижена.',
    'Завершите задачу или передвиньте срок.',
    'Отреагировал'
]

$(document).on('click', '.bx-im-content-notification__panel-title_icon', () => {
    let ids = []
    let interval = 0
    console.log('kill tasks')
    $('.bx-im-content-notification-item__content-container').each((index, item) => {
        let $item = $(item)
        let url = $item.find('.bx-im-content-notification-item-content__content-text a').eq(0).attr('href')
        let taskId = /view\/(\d+)\//.exec(url)[1]
        console.log('task_id=' + taskId)
        let subtitleText = $item.find('.bx-im-content-notification-item-content__content-text').text()
        let isTrash = trashPhrases.some(phrase => subtitleText.includes(phrase))
        if (ids.includes(taskId) || isTrash) {
            $item.css('background', 'red')
            setTimeout(() => {
                $item.find('.bx-im-content-notification-item-header__delete-button').click()
            }, interval)
            interval += 200
        }
        ids.push(taskId)
    })
})