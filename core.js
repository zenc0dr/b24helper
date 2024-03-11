let trashPhrases = [
    'Крайний срок:',
    'ваша эффективность будет снижена.',
    'Завершите задачу или передвиньте срок.',
    'Отреагировал'
]

function writeCounter()
{
    let tasks_qnt = $('.bx-im-content-notification-item__container').length
    let counter_exists = $('.bx-im-content-notification__panel_text .zen-counter').length
    if (!counter_exists) {
        $('.bx-im-content-notification__panel_text').append('<div class="zen-counter">' + tasks_qnt + ' шт.</div>')
    } else {
        $('.bx-im-content-notification__panel_text .zen-counter').text(tasks_qnt + ' шт.')
    }
}

$(document).on('click', '.bx-im-content-notification__panel-title_icon', () => {
    let ids = []
    let interval = 0
    let items_count = $('.bx-im-content-notification-item__content-container').length
    //console.log('kill tasks')
    $('.bx-im-content-notification-item__content-container').each((index, item) => {
        let $item = $(item)
        let url = $item.find('.bx-im-content-notification-item-content__content-text a').eq(0).attr('href')
        let taskId = /view\/(\d+)\//.exec(url)[1]
        console.log('task_id=' + taskId)

        // Поиск мусора может удалять нужные уведомления
        //let subtitleText = $item.find('.bx-im-content-notification-item-content__content-text').text()
        //let isTrash = trashPhrases.some(phrase => subtitleText.includes(phrase))
        let isTrash = false

        if (ids.includes(taskId) || isTrash) {
            $item.css('background', 'red')
            setTimeout(() => {
                $item.find('.bx-im-content-notification-item-header__delete-button').click()
            }, interval)
            interval += 200
        }
        ids.push(taskId)

        /* Последний элемент */
        if (index === items_count - 1) {
            setTimeout(() => {
                writeCounter()
            }, interval)
        }
    })
})