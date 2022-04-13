let allTeachers = localStorage.getItem('allTeachers')
allTeachers = allTeachers ? JSON.parse(allTeachers) : []
function registerTeacher() {
    const form = document.getElementById('reg-form')
    const teacher = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthdayDate: form.birthdayDate.value,
        gender: form.gender.value,
        email: form.email.value,
        mobile: form.mobile.value,
        subject: form.subject.value,
        experience: form.experience.value,
        address: form.address.value,
    }
    if (form.checkValidity()) {
        allTeachers.push(teacher)
        localStorage.setItem('allTeachers', JSON.stringify(allTeachers))
        postMethod(teacher)
        alert('Teacher added successfully!')
        form.reset()
    }
    else alert('Please fill the form with valid values')
}


function postMethod() {
    const URL = 'https:/webdevbasics.net/scripts/demo.php'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    fetch(URL, options).then(response => response.json()).then(res => {
        console.log(red)
    })
}


function addTeachers(container, _teachers) {
    try {
        
        const arrTeachers = _teachers || allTeachers
        if (arrTeachers.length) {
            for (let index = 0; index < arrTeachers.length; index++) {
                let div = document.createElement('div')
                const teacher = arrTeachers[index];
                let strJSON = JSON.stringify(teacher).toString()
                let teacherCard = `<div class="card b-1 hover-shadow mb-20">
                    <div class="media card-body">
                        <div class="media-left pr-12">
                            <img class="avatar avatar-xl no-radius"  src="https://bootdey.com/img/Content/avatar/avatar${index + 1}.png"
                                alt="..." />
                        </div>
                        <div class="media-body">
                            <div class="mb-2">
                                <span class="fs-20 pr-16">${teacher.firstName + ' ' + teacher.lastName}</span>
                            </div>
                            <small class="fs-16 fw-300 ls-1">${teacher.gender}</small>
                        </div>
                        <div class="media-right text-right d-none d-md-block">
                            <p class="fs-14 text-fade mb-12">
                                <i class="fa fa-map-marker pr-1"></i> ${teacher.address}
                            </p>
                            <span class="text-fade"><i class="fa-solid fa-user-tie"></i> ${teacher.experience} Yrs Exp</span>
                        </div>
                    </div>
                    <footer class="card-footer flexbox align-items-center">
                        <div>
                            <strong>Subject:</strong>
                            <span>${teacher.subject}</span>
                        </div>
                        <div class="card-hover-show">
                            <a class="btn btn-xs fs-10 btn-bold btn-primary" teacher-attr=${strJSON} type="button" data-toggle="modal" data-target="#exampleModal">Contact</a>
                        </div>
                    </footer>
                </div>`
                div.innerHTML = teacherCard
                console.log(div)
                container.appendChild(div)
            }
        }
        else {
            console.log('Hello')
            let div = document.createElement('div')
            const message = `<h2>No TUTORS found!!</h2>`
            div.innerHTML = message
            container.appendChild(div)
        }
    }
    catch (err) {
        console.log(err)
    }
}



function getQueryParams() {
    if (window.location.search) {
        const query = window.location.search
        const params = {};
        if (query.includes('&')) {
            // MULTIPLE PARAMETERS
            let _process = query.split("?")[1]
            _process = _process.split("&")
            for (let index = 0; index < _process.length; index++) {
                let element = _process[index];
                element = element.split('=')
                params[element[0]] = element[1]
                if (index === _process.length - 1) return params
            }
        }
        else {
            let _process = query.split("?")[1]
            _process = _process.split("=")
            params[_process[0]] = _process[1]
            return params
        }
    }
    else return null
}

function filterTeacherSubject(subject) {
    let filter = [];
    return new Promise((resolve, reject) => {
        for (let index = 0; index < allTeachers.length; index++) {
            const __tutor = allTeachers[index];
            if (__tutor.subject && __tutor.subject.toLowerCase() === subject.toLowerCase()) {
                filter.push(__tutor)
            }
            if (index === allTeachers.length - 1) resolve(filter)
        }
    })
}

if (window.location.pathname === '/teacher.html') {
    const qp = getQueryParams()
    const subject = qp ? qp.subject : null;
    document.addEventListener("DOMContentLoaded", async () => {
        let container = document.getElementById('teachers')
        if (subject) {
            const subTeacher = await filterTeacherSubject(subject)
            addTeachers(container, subTeacher)
        }
        else addTeachers(container);
    })
}

clearSearch = false
function searchTeacher() {
    clearSearch = clearSearch ? false : true
    if (clearSearch) {
        document.getElementById('sBtn').innerHTML = 'CLEAR'
        let searchText = document.getElementById('search-input').value
        searchText = searchText ? searchText.trim() : searchText
        if (searchText) {
            let datasource = [...allTeachers]
            searchDatasource(searchText, datasource).then(async (indices) => {
                let container = document.getElementById('teachers');
                const searchInp = container.firstElementChild
                container.innerHTML = ''
                container.appendChild(searchInp)
                let teachers = await setSearchResult(indices, datasource)
                if (teachers) {
                    addTeachers(container, teachers)
                }
                else {
                    alert('NO RESULTS FOUND!')
                    addTeachers(container)
                }
            })
        }
    }
    else {
        document.getElementById('sBtn').innerHTML = 'SEARCH'
        let container = document.getElementById('teachers');
        const searchInp = container.firstElementChild
        container.innerHTML = ''
        container.appendChild(searchInp)
        addTeachers(container)
    }
}

function checkName(fname, lname, text) {
    if (text.toLowerCase() == (fname + ' ' + lname).toLowerCase()) return true;
    else return false;
}

function searchDatasource(text, data) {
    let resultIndices = [];
    return new Promise(resolve => {
        for (let index = 0; index < data.length; index++) {
            let _obj = JSON.stringify(data[index]).toLowerCase();
            if (_obj.includes(text.toLowerCase()) || checkName(data[index]['firstName'], data[index]['lastName'], text)) {
                resultIndices.push(index)
            }
            if (index === data, length - 1) resolve(resultIndices)
        }
    })
}

function setSearchResult(result, data) {
    let searchRes = [];
    return new Promise(res => {
        for (let index = 0; index < result.length; index++) {
            const _index = result[index];
            searchRes.push(data[_index])
            if (index === result.length - 1) res(searchRes);
        }
    })
}

var currDialog;
function showContact(element) {
    const teacher = JSON.parse(element.getAttribute('teacher-attr'))
    currDialog = document.createElement("div");
    currDialog.id = 'myDialog'
    let dialog = document.createElement("div");
    dialog.classList.add('dialog')
    dialog.innerHTML = teacherDialog(teacher.firstName, teacher.lastName, teacher.email, teacher.mobile);
    currDialog.appendChild(dialog)
    currDialog.classList.add('d-bg')
    console.log(currDialog)
    document.body.appendChild(currDialog)
    // dialog.show();
}

function teacherDialog(fname, lname, email, mobile) {
    // HOLDS TEACHER CONTENT
    const content = `<div style="width: 100%; background: #f5f5f5; padding: 16px">
        <button id="close-btn" class="close-btn" onclick="close()">X</button>
        <h1>${fname + ' ' + lname}</h1>
        <h3><a href="mailto:${email}">${email}</a></h3>
        <h3><a href="tel:${mobile}">${mobile}</a></h3>
    </div>`
    return content;
}


function close() {
    console.log('hee',)
    currDialog.style.display = 'none'
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'close-btn') {
        let d = document.getElementsByClassName('dialog')
        currDialog.classList.add('hide-me')
    }
})