addEventListener('DOMContentLoaded', function () {
    const parsingLocal = function () { return JSON.parse(localStorage.getItem('content')) };
    const postData = function (data) { localStorage.setItem('content', JSON.stringify(data)) };

    // добавление обработчиков кнопок
    function addEventsForBtn() {
        let stageBtn = document.querySelectorAll('.fa-circle, .fa-check-circle');
        console.dir(stageBtn);
        for (let i = 0; i < stageBtn.length; i++) {
            stageBtn[i].addEventListener("click", updateTask);
        }

        let removeBtn = document.querySelectorAll('.fa-trash');
        for (let i = 0; i < removeBtn.length; i++) {
            removeBtn[i].addEventListener("click", removeTask);
        }
    }

    // запись нового задания в хранилище
    function postTask(title) {
        let tasksInArr = parsingLocal();
        let task = {};
        task.title = title;
        task.done = 0;
        tasksInArr.push(task);
        postData(tasksInArr);
    }

    // обновление записи задачи
    function updateTask(e) {
        let title = e.target.parentElement.innerText;
        let tasksInArr = parsingLocal();
        let index = tasksInArr.findIndex(function (e) { return e.title == title });
        let task = tasksInArr[index];
        task.done = task.done ? 0 : 1;
        tasksInArr.splice(index, 1, task);
        postData(tasksInArr);
        addTasksOnPage();
        return;
    }

    // удаление записи задачи
    function removeTask(e) {
        let title = e.target.parentElement.innerText;
        let tasksInArr = parsingLocal();
        let index = tasksInArr.findIndex(function (e) { return e.title == title });
        tasksInArr.splice(index, 1);
        postData(tasksInArr);
        addTasksOnPage();
        return;
    }
    // функции для сортировки элементов массива
    const compare = function (a, b) { return b.done - a.done }
    const compareByText = function (a, b) { return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1 }

    // составление списка
    const addTasksOnPage = function (tasksInArr) {
        if (!tasksInArr) tasksInArr = parsingLocal();
        document.getElementById('tasks').innerHTML = '';
        let item;
        let done;
        tasksInArr.sort(compareByText).sort(compare);
        tasksInArr.forEach(function (element) {
            item = document.createElement("li");
            item.innerText = element.title;
            document.getElementById('tasks').appendChild(item);
            done = element.done;
            // кнопка удаления
            btn2 = document.createElement("i");
            btn2.classList.add("fa");
            btn2.classList.add("fa-trash");
            btn2.setAttribute('title', 'delete');
            item.append(btn2);
            // кнопка переключения состояния задачи
            btn1 = document.createElement("i");
            btn1.classList.add("fa");
            (done) ? btn1.classList.add("fa-check-circle") : btn1.classList.add("fa-circle");
            btn1.setAttribute('title', 'is it complete?');
            item.append(btn1);
        });
        addEventsForBtn();
    }

    // Проверяем есть ли уже контент в local
    if (!localStorage.getItem('content')) {
        let tasksInNode = document.querySelectorAll("#tasks > li");
        let tasksInArr = [];
        let task;
        for (let i = 0; i < tasksInNode.length; i++) {
            task = {};
            task.title = tasksInNode[i].innerText;
            task.done = 0;
            tasksInArr.push(task)
        }
        postData(tasksInArr);
        addEventsForBtn();
    } else addTasksOnPage();

    // обработка запроса добавления задания
    function addNewTask(e) {
        e.preventDefault;
        postTask(document.getElementById("title_input").value);
        document.getElementById("title_input").value = '';
        addTasksOnPage();
    }

    let btn = document.getElementById("btn");
    btn.addEventListener("click", addNewTask);
    let titleInput = document.getElementById("title_input");
    titleInput.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            addNewTask(e);
        }
    });
})
