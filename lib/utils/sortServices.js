'use_strict'

function sortServices(services) {
    // Сортируем все сервисы их по алфавиту
    const _services = sortServiceByName(services);
    // Добавляем в начало сервисы без зависимостей
    const result = _services.filter(i => i.deps.length === 0);
    const withDeps = _services.filter(i => i.deps.length > 0);
    // Теперь сортируем сервисы исходя из их зависимостей
    let waitList = withDeps.splice(0, 1); // Забираем первый элемент из массива
    let i = 0;
    while (waitList.length > 0) {
        // Проходим по листу ожиданий и проверяем на готовность
        for (const waiting of waitList) {
            if (isResolved(waiting)) {
                waitList = clearItem(waitList, waiting)
                result.push(waiting);
            }
        }
        // Берем следующий сервис
        const next = withDeps.shift();
        if (next) waitList.push(next);
    }
    
    return result;
    function sortServiceByName(services) {
        return services.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    function isResolved(item) {
        const servicesName = result.map(i => i.name);
        return item.deps.every(dep => servicesName.includes(dep));
    }
    function clearItem(list, item) {
        return list.filter(i => i.name !== item.name);
    }
}

module.exports = {
    sortServices
}