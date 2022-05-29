
/* 

要素の取得

*/

/* ボタンの要素取得 */

const addTaskButton = document.getElementById("add-task")
const finishTaskButtons = document.getElementsByClassName("finish-task")

/* リスト全体を取得 */
const taskList = document.getElementById("todo-list")


/* イベント系の処理 */

/* 追加ボタンを押したときの処理 */

const addTask = () => {
    const inputValue = document.querySelector("input[name='task']").value
    const body = JSON.stringify({value: inputValue})
    sendCreateRequest(body).then(res => {
        if (res.rowCount != 0) {
            showTasks()
        }
    })
}


/*

完了ボタンを押したときの処理 

*/

const finishTask = (e, id) => {
    const body = JSON.stringify({
        id: id,
        flag: true
    })
    sendCompleteRequest(body).then(res => {
        if (res.rowCount != 0) {
            removeTask(e)
        }
    })
}

/* DOMを削除する */
const removeTask = (e) => {
    const removeArea = e.target.closest("li.flex-list")
    removeArea.remove()
}


/*

ロードしたときにの処理

*/

const showTasks = () => {
    sendGetRequest()
     .then(json => renderTask(json))
}


/* 

　DOMにレンダリングする系の処理 

*/

const renderTask = (json) => {
    json.rows.forEach(todo => {
        const inputValue = todo.task
        const newLi = renderUi(inputValue, todo.id)
        taskList.appendChild(newLi)
    });
}

/*

　タスクのDOMを生成＆イベントを追加する 
　for文使った方が良いかもしれない。
*/

const renderUi = (text, id) => {
    const li = document.createElement("li")
    li.setAttribute("class", "flex-list")
    const p = document.createElement("p")
    p.setAttribute("class", "task-text") 
    p.innerText = text
    const div = document.createElement("div")
    div.setAttribute("class", "button-group")
    const button = document.createElement("button")
    button.setAttribute("id", `task-${id}`)
    button.innerText = "完了"
    button.addEventListener("click", (e) => {
        finishTask(e, id)
    })
    div.appendChild(button)
    li.appendChild(p)
    li.appendChild(div)
    return li
}


/*

Fetch APIのラップ（あまり意味が無いので要らないかもしれない） 

*/

/* 作成のリクエストを送る */
 const sendCreateRequest = (body) => {
    return fetch('http://localhost:3000/create', {
        method: "POST",
        body: body,
        headers:{'Content-Type': 'application/json'}
    }).then((res)=> res.json())
 }

 /* 取得のリクエストを送る */
const sendGetRequest = () => {
    return fetch('http://localhost:3000/tasks')
      .then(res => res.json())
}

/* 完了のフラグを更新する */

const sendCompleteRequest = (body) => {
    return fetch('http://localhost:3000/finish-task', {
        method: "POST",
        body: body,
        headers:{'Content-Type': 'application/json'},
    }).then(res => res.json())
}

/* 

　イベント系の登録 

*/

window.onload = showTasks
addTaskButton.addEventListener("click", addTask)
