
const buildTodoList = rows => {
    let result = [];
    let prevBucket = null;
    rows.forEach(element => {
        let index = result.length;
        if (!prevBucket || prevBucket !== element.batch_id) {

            result.push({
                batch_id: element.batch_id,
                batch_name: element.batch_name,
                todos: [],
                inCompleteCount: 0,
                completeCount: 0
            });
            index++;
            prevBucket = element.batch_id;
        }
        result[index - 1].todos.push(element);
        element.is_completed === 0 ? result[index - 1].inCompleteCount++ : result[index - 1].completeCount++;
    });

    return result
}

export default buildTodoList