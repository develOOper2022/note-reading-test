window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let wholeNote = document.querySelector('.whole-note');
    let showNoteBtn = document.querySelector('.show-note-btn');
    let notesClasses = ['note-C','note-D','note-E','note-F','note-G','note-A','note-B'];
    let answerNoteBtn = document.querySelectorAll('.answer-note-btn');
    let musicalNotes = ['До', 'Ре', 'Мі', 'Фа', 'Соль', 'Ля', 'Сі'];
    let index;
    let answerBox = document.querySelector('.answer');

    function generateIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    function getFalseAnswer(arr,arr2) {
        let index = generateIndex(arr);
        arr2.push(arr[index]);
        arr.splice(index, 1);
    }

    showNoteBtn.addEventListener('click', function() {
        index = generateIndex(notesClasses);
        wholeNote.classList.remove(...notesClasses);
        wholeNote.classList.add(notesClasses[index]);
        answerBox.classList.remove('correct','incorrect');
        answerBox.innerHTML = '';

        let noteNames = musicalNotes.slice();
        let answerArr = [];
        answerArr.push(noteNames[index]);
        noteNames.splice(index, 1);

        getFalseAnswer(noteNames, answerArr);
        getFalseAnswer(noteNames, answerArr);
        getFalseAnswer(noteNames, answerArr);

        answerNoteBtn.forEach(item => {
            let index = generateIndex(answerArr);
            item.innerHTML = answerArr[index];
            answerArr.splice(index, 1);
        });
    });

    answerNoteBtn.forEach(item => {
        item.addEventListener('click', function() {
            if (item.innerHTML == musicalNotes[index]) {
                answerBox.innerHTML = 'Правильно';
                answerBox.classList.remove('correct','incorrect');
                answerBox.classList.add('correct');
                answerNoteBtn.forEach(item => {
                    item.innerHTML = '';
                });
                wholeNote.classList.remove(...notesClasses);
            } else {
                answerBox.innerHTML = 'Неправильно';
                answerBox.classList.add('incorrect');
            }
        });
    });

    
});