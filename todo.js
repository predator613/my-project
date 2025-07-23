const reviewerList = []; 
const basereviewerId = 'revieweritem';

function deleteElement(id) {
    const index = reviewerList.findIndex(item => item.id === id);
    if (index !== -1) {
        reviewerList.splice(index, 1);
        const element = document.getElementById(basereviewerId + id);
        if (element) element.remove();
    }
}

function addreviewer() {
    try {
        const form = document.forms.addreviewerForm;
        
        // Валидация
        if (!form.elements.name.value.trim()) {
            alert('Пожалуйста, введите ваше имя');
            return;
        }
        
        const newreviewer = {
            id: reviewerList.length > 0 ? Math.max(...reviewerList.map(r => r.id)) + 1 : 1,
            selectedCategory: document.getElementById('categorySelect').value,
            name: form.elements.name.value,
            description: form.elements.description.value
        };
        
        reviewerList.push(newreviewer);
        addreviewerHtml(newreviewer);
        form.reset();
    } catch (error) {
        console.error('Ошибка при добавлении отзыва:', error);
    }
}

function addreviewerHtml(newreviewer) {
    const div = document.createElement('div');
    div.id = basereviewerId + newreviewer.id;
    div.className = 'card-class mb-3';
    
    div.innerHTML = `
    <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
            <h5 class="card-title">${newreviewer.selectedCategory}</h5>
            <p class="card-text"><strong>${newreviewer.name}</strong></p>
            <p class="card-text">${newreviewer.description}</p>
            <button class="btn btn-danger" onclick="deleteElement(${newreviewer.id})">
                Удалить отзыв
            </button>
        </div>
    </div>`;
    
    document.getElementById('reviewerContainer').prepend(div);