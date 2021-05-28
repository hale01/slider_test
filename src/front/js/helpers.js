import {isDevMode, staticBasePath } from '@/variables';


/**
 * Получаем путь до статики.
 *
 * @param {string|String} path Относительный путь до файла.
 * @return {string}
 */
export function staticPath(path) {
    if (!staticBasePath.startsWith('/') || !staticBasePath.endsWith('/')) {
        throw new Error(
            `Путь до статики должен начинаться и заканчиваться "/".
             Текущий путь: ${staticBasePath}`)
    }
    return `${staticBasePath}${path}`.replace(/\/+/, '/')
}


/**
 * Формирование ссылки на превью.
 *
 * Превью создает веб сервер.
 *
 * @param path {String} Путь до оригинала
 * @param width {Number}
 * @param height {Number}
 * @param type {string|String}
 * @returns {string}
 */
export function thumbnail(path, width, height = null, type='resize') {
    height = height || width;

    if (!['resize', 'crop'].some(item => item === type)) {
        throw new Error(`Недопустимый тип миниатюры: ${type}`)
    }

    if (!path) {
        return ''
    }

    if (!width || !height || isDevMode) {
        return path
    }
    return `/${type}/${width}/${height}${path}`
}

export default {thumbnail, staticPath}
