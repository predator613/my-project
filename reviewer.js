const reviewerList = []; 
const basereviewerId = 'revieweritem';

function deleteElement(id) {
    const index = reviewerList.findIndex(item => item.id === id); 
    reviewerList.splice(index, 1); 
    document.getElementById(basereviewerId + id).remove();
}

function addreviewer() {
    // получаем форму из нашего html 
    const form = document.forms.addreviewerForm; 
    const categorySelect = document.getElementById('categorySelect'); 
    // достаем значения каждого из полей ввода 
    const newreviewer = { 
        id: createNewId(),
        selectedCategory: categorySelect.value, 
        name: form.elements.name.value, 
        description: form.elements.description.value 
    }; 
    reviewerList.push(newreviewer); 
    addreviewerHtml(newreviewer);
    form.reset(); // Очищаем форму после добавления
}

function createNewId() {
    return reviewerList.length === 0 ? 
        1 : Math.max(...reviewerList.map(reviewer => reviewer.id)) + 1;
}

function addreviewerHtml(newreviewer) {
    const div = document.createElement('div'); 
    div.id = basereviewerId + newreviewer.id; 
    div.className = 'card-class';

    div.innerHTML = `
    <div class="col">
        <div class="card">
            <div class="card-header" style="height: 35px; background-color: #808080"></div>
            <p class="card-name">${newreviewer.name}</p>
            <div class="card-body">
                <h5 class="card-title">${newreviewer.selectedCategory}</h5>
                <p class="card-text">${newreviewer.description}</p>
                <button type="button" class="delete-button" 
                    onclick="deleteElement(${newreviewer.id})">Удалить отзыв</button>
            </div>
        </div>
    </div>`;

    // добавляем наш элемент в контейнер
    document.getElementById('reviewerContainer').append(div);
