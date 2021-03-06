window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let trebleClef = document.querySelector('.trebleClef');
    let bassClef = document.querySelector('.bassClef');
    let wholeNote = document.querySelector('.whole-note');
    let showNoteBtn = document.querySelector('.show-note-btn');
    // let notesClasses = ['note-C','note-D','note-E','note-F','note-G','note-A','note-B'];
    let answerNoteBtn = document.querySelectorAll('.answer-note-btn');
    let musicalClef = ['treble-clef', 'bass-clef'];
    let musicalOctaves = ['first', 'second', 'third'];
    let musicalNotes = ['До', 'Ре', 'Мі', 'Фа', 'Соль', 'Ля', 'Сі'];
    let clefIndex;
    let octaveIndex;
    let noteIndex;
    let answerBox = document.querySelector('.answer');
    let extraLines = document.querySelectorAll('.extra-line');

    let notesClasses = [
        [
            ['note-C-first', 'note-D-first', 'note-E-first', 'note-F-first', 'note-G-first', 'note-A-first', 'note-B-first'],
            ['note-C-second', 'note-D-second', 'note-E-second', 'note-F-second', 'note-G-second', 'note-A-second', 'note-B-second'],
            ['note-C-third', 'note-D-third', 'note-E-third', 'note-F-third', 'note-G-third', 'note-A-third', 'note-B-third']
        ],
        [
            ['note-C-small', 'note-D-small', 'note-E-small', 'note-F-small', 'note-G-small', 'note-A-small', 'note-B-small'],
            ['note-C-great', 'note-D-great', 'note-E-great', 'note-F-great', 'note-G-great', 'note-A-great', 'note-B-great'],
            ['note-C-contra', 'note-D-contra', 'note-E-contra', 'note-F-contra', 'note-G-contra', 'note-A-contra', 'note-B-contra']
        ]
    ];

    function generateIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    function getFalseAnswer(arr,arr2) {
        let index = generateIndex(arr);
        arr2.push(arr[index]);
        arr.splice(index, 1);
    }

    function showExtraLine(a,b) {
        for (let i = a; i < b; i++) {
            extraLines[i].classList.add('show-extra-line');
        }
    }

    function hideExtraLine() {
        extraLines.forEach(item => {
            item.classList.remove('show-extra-line');
        });
    }

    showNoteBtn.addEventListener('click', function() {
        hideExtraLine();
        clefIndex = generateIndex(musicalClef);
        octaveIndex = generateIndex(musicalOctaves);
        noteIndex = generateIndex(musicalNotes);
        let randomNote = notesClasses[clefIndex][octaveIndex][noteIndex];

        if (clefIndex == 0) {
            bassClef.classList.remove('show-content');
            bassClef.classList.add('hide-content');
            trebleClef.classList.remove('hide-content');
            trebleClef.classList.add('show-content');
        } else if (clefIndex == 1) {
            trebleClef.classList.remove('show-content');
            trebleClef.classList.add('hide-content');
            bassClef.classList.remove('hide-content');
            bassClef.classList.add('show-content');
        }

        wholeNote.className = '';
        wholeNote.classList.add('whole-note', 'show-content', randomNote);
        answerBox.classList.remove('correct','incorrect');
        answerBox.innerHTML = '';

        if (randomNote == notesClasses[0][0][0]) {
            showExtraLine(5,6);
        } else if (randomNote == notesClasses[0][1][5] || randomNote == notesClasses[0][1][6]) {
            showExtraLine(4,5);
        } else if (randomNote == notesClasses[0][2][0] || randomNote == notesClasses[0][2][1]) {
            showExtraLine(3,5);
        } else if (randomNote == notesClasses[0][2][2] || randomNote == notesClasses[0][2][3]) {
            showExtraLine(2,5);
        } else if (randomNote == notesClasses[0][2][4] || randomNote == notesClasses[0][2][5]) {
            showExtraLine(1,5);
        } else if (randomNote == notesClasses[0][2][6]) {
            showExtraLine(0,5);
        } else if (randomNote == notesClasses[1][1][1] || randomNote == notesClasses[1][1][2]) {
            showExtraLine(5,6);
        } else if (randomNote == notesClasses[1][1][0] || randomNote == notesClasses[1][2][6]) {
            showExtraLine(5,7);
        } else if (randomNote == notesClasses[1][2][4] || randomNote == notesClasses[1][2][5]) {
            showExtraLine(5,8);
        } else if (randomNote == notesClasses[1][2][2] || randomNote == notesClasses[1][2][3]) {
            showExtraLine(5,9);
        } else if (randomNote == notesClasses[1][2][0] || randomNote == notesClasses[1][2][1]) {
            showExtraLine(5,10);
        }


        let noteNames = musicalNotes.slice();
        let answerArr = [];
        answerArr.push(noteNames[noteIndex]);
        noteNames.splice(noteIndex, 1);

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
            if (item.innerHTML == musicalNotes[noteIndex]) {
                answerBox.innerHTML = 'Правильно';
                answerBox.classList.remove('correct','incorrect');
                answerBox.classList.add('correct');
                answerNoteBtn.forEach(item => {
                    item.innerHTML = '';
                });
                wholeNote.classList.remove('show-content', ...notesClasses[clefIndex][octaveIndex]);
                hideExtraLine();
            } else {
                answerBox.innerHTML = 'Неправильно';
                answerBox.classList.add('incorrect');
            }
        });
    });
});