        document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const noteList = document.getElementById('noteList');
            const noteTitle = document.getElementById('noteTitle');
            const noteEditor = document.getElementById('noteEditor');
            const scriptureContainer = document.getElementById('scriptureContainer');
            const offlineIndicator = document.getElementById('offlineIndicator');
            const notification = document.getElementById('notification');
            const bibleBookSelect = document.getElementById('bibleBookSelect');
            const bibleChapter = document.getElementById('bibleChapter');
            const bibleVerse = document.getElementById('bibleVerse');
            const bibleVersion = document.getElementById('bibleVersion');
            const fetchVerseBtn = document.getElementById('fetchVerseBtn');
            const bibleResults = document.getElementById('bibleResults');
            const scriptureCount = document.getElementById('scriptureCount');
            
            // Buttons
            const newNoteBtn = document.getElementById('newNoteBtn');
            const saveNoteBtn = document.getElementById('saveNoteBtn');
            const deleteNoteBtn = document.getElementById('deleteNoteBtn');
            const addScriptureBtn = document.getElementById('addScriptureBtn');
            const autoReferenceBtn = document.getElementById('autoReferenceBtn');
            const highlightBtn = document.getElementById('highlightBtn');
            const studyToolsBtn = document.getElementById('studyToolsBtn');
            const exportNoteBtn = document.getElementById('exportNoteBtn');
            
            // Study Tools Elements
            const studyToolsModal = document.getElementById('studyToolsModal');
            const closeStudyToolsBtn = document.getElementById('closeStudyToolsBtn');
            const studyTabs = document.querySelectorAll('.study-tab');
            const tabContents = document.querySelectorAll('.study-tab-content');
            
            // Word Study
            const searchWordStudyBtn = document.getElementById('searchWordStudy');
            const wordStudyInput = document.getElementById('wordStudyInput');
            const wordStudyResults = document.getElementById('wordStudyResults');
            
            // Cross References
            const searchCrossReferencesBtn = document.getElementById('searchCrossReferences');
            const crossRefInput = document.getElementById('crossRefInput');
            const crossReferenceResults = document.getElementById('crossReferenceResults');
            
            // Commentary
            const searchCommentaryBtn = document.getElementById('searchCommentary');
            const commentaryInput = document.getElementById('commentaryInput');
            const commentaryResults = document.getElementById('commentaryResults');
            
            // Reading Plan
            const startReadingPlanBtn = document.getElementById('startReadingPlan');
            const readingPlanSelect = document.getElementById('readingPlanSelect');
            const readingPlan = document.getElementById('readingPlan');
            
            // Prayer List
            const addPrayerRequestBtn = document.getElementById('addPrayerRequest');
            const prayerInput = document.getElementById('prayerInput');
            const prayerList = document.getElementById('prayerList');
            
            // Importance buttons
            const importanceBtns = document.querySelectorAll('.importance-btn');
            
            // State
            let notes = JSON.parse(localStorage.getItem('bibleNotes')) || [];
            let currentNoteId = null;
            let currentImportance = 'low';
            let prayerRequests = JSON.parse(localStorage.getItem('prayerRequests')) || [];
            let readingProgress = JSON.parse(localStorage.getItem('readingProgress')) || {};
            
            // Bible database structure
            const bibleStructure = {
                "Old Testament": {
                    "genesis": { name: "Genesis", chapters: 50 },
                    "exodus": { name: "Exodus", chapters: 40 },
                    "leviticus": { name: "Leviticus", chapters: 27 },
                    "numbers": { name: "Numbers", chapters: 36 },
                    "deuteronomy": { name: "Deuteronomy", chapters: 34 },
                    "joshua": { name: "Joshua", chapters: 24 },
                    "judges": { name: "Judges", chapters: 21 },
                    "ruth": { name: "Ruth", chapters: 4 },
                    "1-samuel": { name: "1 Samuel", chapters: 31 },
                    "2-samuel": { name: "2 Samuel", chapters: 24 },
                    "1-kings": { name: "1 Kings", chapters: 22 },
                    "2-kings": { name: "2 Kings", chapters: 25 },
                    "1-chronicles": { name: "1 Chronicles", chapters: 29 },
                    "2-chronicles": { name: "2 Chronicles", chapters: 36 },
                    "ezra": { name: "Ezra", chapters: 10 },
                    "nehemiah": { name: "Nehemiah", chapters: 13 },
                    "esther": { name: "Esther", chapters: 10 },
                    "job": { name: "Job", chapters: 42 },
                    "psalms": { name: "Psalms", chapters: 150 },
                    "proverbs": { name: "Proverbs", chapters: 31 },
                    "ecclesiastes": { name: "Ecclesiastes", chapters: 12 },
                    "song-of-solomon": { name: "Song of Solomon", chapters: 8 },
                    "isaiah": { name: "Isaiah", chapters: 66 },
                    "jeremiah": { name: "Jeremiah", chapters: 52 },
                    "lamentations": { name: "Lamentations", chapters: 5 },
                    "ezekiel": { name: "Ezekiel", chapters: 48 },
                    "daniel": { name: "Daniel", chapters: 12 },
                    "hosea": { name: "Hosea", chapters: 14 },
                    "joel": { name: "Joel", chapters: 3 },
                    "amos": { name: "Amos", chapters: 9 },
                    "obadiah": { name: "Obadiah", chapters: 1 },
                    "jonah": { name: "Jonah", chapters: 4 },
                    "micah": { name: "Micah", chapters: 7 },
                    "nahum": { name: "Nahum", chapters: 3 },
                    "habakkuk": { name: "Habakkuk", chapters: 3 },
                    "zephaniah": { name: "Zephaniah", chapters: 3 },
                    "haggai": { name: "Haggai", chapters: 2 },
                    "zechariah": { name: "Zechariah", chapters: 14 },
                    "malachi": { name: "Malachi", chapters: 4 }
                },
                "New Testament": {
                    "matthew": { name: "Matthew", chapters: 28 },
                    "mark": { name: "Mark", chapters: 16 },
                    "luke": { name: "Luke", chapters: 24 },
                    "john": { name: "John", chapters: 21 },
                    "acts": { name: "Acts", chapters: 28 },
                    "romans": { name: "Romans", chapters: 16 },
                    "1-corinthians": { name: "1 Corinthians", chapters: 16 },
                    "2-corinthians": { name: "2 Corinthians", chapters: 13 },
                    "galatians": { name: "Galatians", chapters: 6 },
                    "ephesians": { name: "Ephesians", chapters: 6 },
                    "philippians": { name: "Philippians", chapters: 4 },
                    "colossians": { name: "Colossians", chapters: 4 },
                    "1-thessalonians": { name: "1 Thessalonians", chapters: 5 },
                    "2-thessalonians": { name: "2 Thessalonians", chapters: 3 },
                    "1-timothy": { name: "1 Timothy", chapters: 6 },
                    "2-timothy": { name: "2 Timothy", chapters: 4 },
                    "titus": { name: "Titus", chapters: 3 },
                    "philemon": { name: "Philemon", chapters: 1 },
                    "hebrews": { name: "Hebrews", chapters: 13 },
                    "james": { name: "James", chapters: 5 },
                    "1-peter": { name: "1 Peter", chapters: 5 },
                    "2-peter": { name: "2 Peter", chapters: 3 },
                    "1-john": { name: "1 John", chapters: 5 },
                    "2-john": { name: "2 John", chapters: 1 },
                    "3-john": { name: "3 John", chapters: 1 },
                    "jude": { name: "Jude", chapters: 1 },
                    "revelation": { name: "Revelation", chapters: 22 }
                }
            };

            // Word Study Database (simplified)
            const wordStudyDatabase = {
                "faith": {
                    hebrew: "אמונה (emunah)",
                    greek: "πίστις (pistis)",
                    definition: "Firm persuasion, conviction, belief in the truth",
                    verses: ["Hebrews 11:1", "Romans 10:17", "Ephesians 2:8-9", "James 2:17"]
                },
                "love": {
                    hebrew: "אהבה (ahavah)",
                    greek: "αγάπη (agape)",
                    definition: "Unconditional, self-sacrificial love",
                    verses: ["1 Corinthians 13:4-7", "John 3:16", "1 John 4:8", "Romans 5:8"]
                },
                "grace": {
                    hebrew: "חן (chen)",
                    greek: "χάρις (charis)",
                    definition: "Unmerited favor, gift, blessing",
                    verses: ["Ephesians 2:8-9", "2 Corinthians 12:9", "Romans 3:24", "Titus 2:11"]
                },
                "hope": {
                    hebrew: "תקווה (tikvah)",
                    greek: "εληίς (elpis)",
                    definition: "Confident expectation, trust",
                    verses: ["Romans 15:13", "Hebrews 6:19", "Jeremiah 29:11", "1 Peter 1:3"]
                },
                "peace": {
                    hebrew: "שלום (shalom)",
                    greek: "ειρήνη (eirene)",
                    definition: "Wholeness, completeness, harmony",
                    verses: ["Philippians 4:7", "John 14:27", "Romans 5:1", "Isaiah 26:3"]
                }
            };

            // Cross References Database (simplified)
            const crossReferences = {
                "John 3:16": ["Romans 5:8", "1 John 4:9-10", "Ephesians 2:4-5"],
                "Psalm 23:1": ["John 10:11", "Hebrews 13:20", "Revelation 7:17"],
                "Philippians 4:13": ["2 Corinthians 12:9-10", "Isaiah 40:29-31", "Ephesians 3:16"],
                "Jeremiah 29:11": ["Romans 8:28", "Proverbs 3:5-6", "Isaiah 55:8-9"],
                "Romans 8:28": ["Genesis 50:20", "James 1:2-4", "2 Corinthians 4:17-18"]
            };

            // Commentary Database (simplified)
            const commentaryDatabase = {
                "John 3:16": "This verse encapsulates the entire gospel message - God's love for humanity demonstrated through the sacrifice of His Son, offering eternal life to all who believe.",
                "Psalm 23:1": "David declares the Lord as his shepherd, expressing complete trust in God's provision, guidance, and protection throughout life's journey.",
                "Philippians 4:13": "Paul affirms that through Christ's strength, believers can endure all circumstances, not by their own power but through divine empowerment.",
                "Romans 8:28": "This promise assures believers that God works through all circumstances for their ultimate good, even when situations appear difficult or confusing."
            };

            // Initialize
            renderNoteList();
            checkOnlineStatus();
            populateBibleBooks();
            renderPrayerList();
            
            // Event Listeners
            newNoteBtn.addEventListener('click', createNewNote);
            saveNoteBtn.addEventListener('click', saveNote);
            deleteNoteBtn.addEventListener('click', deleteCurrentNote);
            addScriptureBtn.addEventListener('click', showBibleSearch);
            autoReferenceBtn.addEventListener('click', autoReferenceScriptures);
            highlightBtn.addEventListener('click', toggleHighlight);
            studyToolsBtn.addEventListener('click', showStudyTools);
            exportNoteBtn.addEventListener('click', exportNote);
            fetchVerseBtn.addEventListener('click', fetchScripture);
            
            // Study Tools Event Listeners
            closeStudyToolsBtn.addEventListener('click', hideStudyTools);
            studyTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    switchStudyTab(tabId);
                });
            });
            
            searchWordStudyBtn.addEventListener('click', searchWordStudy);
            searchCrossReferencesBtn.addEventListener('click', searchCrossReferences);
            searchCommentaryBtn.addEventListener('click', searchCommentary);
            startReadingPlanBtn.addEventListener('click', startReadingPlan);
            addPrayerRequestBtn.addEventListener('click', addPrayerRequest);
            
            bibleBookSelect.addEventListener('change', function() {
                if (this.value) {
                    const bookInfo = getBookInfo(this.value);
                    bibleChapter.max = bookInfo.chapters;
                    bibleChapter.value = 1;
                    bibleVerse.value = '';
                }
            });
            
            importanceBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    importanceBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentImportance = this.getAttribute('data-importance');
                });
            });
            
            // Online/Offline detection
            window.addEventListener('online', function() {
                offlineIndicator.style.display = 'none';
                showNotification('Back online', 'success');
            });
            
            window.addEventListener('offline', function() {
                offlineIndicator.style.display = 'block';
                showNotification('Working offline', 'warning');
            });
            
            // Functions
            function createNewNote() {
                currentNoteId = Date.now().toString();
                noteTitle.value = '';
                noteEditor.value = '';
                scriptureContainer.innerHTML = '';
                
                // Reset to low importance
                importanceBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.importance-btn.low').classList.add('active');
                currentImportance = 'low';
                
                renderNoteList();
            }
            
            function saveNote() {
                if (!currentNoteId) {
                    currentNoteId = Date.now().toString();
                }
                
                const note = {
                    id: currentNoteId,
                    title: noteTitle.value || 'Untitled Note',
                    content: noteEditor.value,
                    importance: currentImportance,
                    scriptures: scriptureContainer.innerHTML,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                // Update or add note
                const existingIndex = notes.findIndex(n => n.id === currentNoteId);
                if (existingIndex !== -1) {
                    notes[existingIndex] = note;
                } else {
                    notes.push(note);
                }
                
                // Save to localStorage
                localStorage.setItem('bibleNotes', JSON.stringify(notes));
                renderNoteList();
                
                // Show confirmation
                showNotification('Note saved successfully!', 'success');
            }
            
            function deleteCurrentNote() {
                if (!currentNoteId) {
                    showNotification('No note selected to delete', 'error');
                    return;
                }
                
                if (confirm('Are you sure you want to delete this note?')) {
                    notes = notes.filter(note => note.id !== currentNoteId);
                    localStorage.setItem('bibleNotes', JSON.stringify(notes));
                    createNewNote();
                    renderNoteList();
                    showNotification('Note deleted successfully', 'success');
                }
            }
            
            function deleteNote(noteId, event) {
                event.stopPropagation(); // Prevent triggering the note click
                
                if (confirm('Are you sure you want to delete this note?')) {
                    notes = notes.filter(note => note.id !== noteId);
                    localStorage.setItem('bibleNotes', JSON.stringify(notes));
                    
                    if (currentNoteId === noteId) {
                        createNewNote();
                    }
                    
                    renderNoteList();
                    showNotification('Note deleted successfully', 'success');
                }
            }
            
            function deleteScripture(scriptureElement) {
                if (confirm('Remove this scripture from your note?')) {
                    scriptureElement.remove();
                    saveNote(); // Auto-save after removal
                    showNotification('Scripture removed', 'info');
                }
            }
            
            function renderNoteList() {
                noteList.innerHTML = '';
                
                if (notes.length === 0) {
                    noteList.innerHTML = '<p>No notes yet. Create your first note!</p>';
                    return;
                }
                
                // Sort notes by creation date (newest first)
                notes.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
                
                notes.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.className = `note-item ${note.importance} ${note.id === currentNoteId ? 'active' : ''}`;
                    noteElement.innerHTML = `
                        <div class="note-title">
                            ${note.title}
                            <span>${new Date(note.updatedAt || note.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div class="note-preview">${note.content.substring(0, 50)}${note.content.length > 50 ? '...' : ''}</div>
                        <button class="delete-note" onclick="deleteNote('${note.id}', event)">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    noteElement.addEventListener('click', function() {
                        loadNote(note.id);
                    });
                    
                    noteList.appendChild(noteElement);
                });
            }
            
            function loadNote(noteId) {
                const note = notes.find(n => n.id === noteId);
                if (!note) return;
                
                currentNoteId = note.id;
                noteTitle.value = note.title;
                noteEditor.value = note.content;
                scriptureContainer.innerHTML = note.scriptures || '';
                
                // Reattach delete event listeners to scriptures
                scriptureContainer.querySelectorAll('.bible-quote').forEach(scripture => {
                    const deleteBtn = scripture.querySelector('.delete-scripture');
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', function() {
                            deleteScripture(scripture);
                        });
                    }
                });
                
                // Set importance
                importanceBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector(`.importance-btn.${note.importance}`).classList.add('active');
                currentImportance = note.importance;
                
                renderNoteList();
            }
            
            function populateBibleBooks() {
                bibleBookSelect.innerHTML = '<option value="">Select a Book</option>';
                
                for (const testament in bibleStructure) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = testament;
                    
                    for (const bookKey in bibleStructure[testament]) {
                        const book = bibleStructure[testament][bookKey];
                        const option = document.createElement('option');
                        option.value = bookKey;
                        option.textContent = book.name;
                        optgroup.appendChild(option);
                    }
                    
                    bibleBookSelect.appendChild(optgroup);
                }
            }
            
            function getBookInfo(bookKey) {
                for (const testament in bibleStructure) {
                    if (bibleStructure[testament][bookKey]) {
                        return bibleStructure[testament][bookKey];
                    }
                }
                return { name: bookKey, chapters: 0 };
            }
            
            function fetchScripture() {
                const version = bibleVersion.value;
                const bookKey = bibleBookSelect.value;
                const chapter = bibleChapter.value;
                const verse = bibleVerse.value;
                
                if (!bookKey || !chapter) {
                    showNotification('Please select a book and chapter', 'error');
                    return;
                }
                
                const bookInfo = getBookInfo(bookKey);
                
                // Show loading state
                const originalText = fetchVerseBtn.innerHTML;
                fetchVerseBtn.innerHTML = '<div class="loading"></div> Loading...';
                fetchVerseBtn.disabled = true;
                
                let apiUrl;
                if (verse) {
                    // Fetch specific verse using the Bible API with API key
                    apiUrl = `https://api.scripture.api.bible/v1/bibles/${getBibleId(version)}/verses/${bookInfo.name.toUpperCase()}.${chapter}.${verse}?content-type=text&include-notes=false&include-titles=false`;
                } else {
                    // Fetch entire chapter
                    apiUrl = `https://api.scripture.api.bible/v1/bibles/${getBibleId(version)}/chapters/${bookInfo.name.toUpperCase()}.${chapter}?content-type=text&include-notes=false&include-titles=true`;
                }
                
                console.log('Fetching from:', apiUrl);
                
                fetch(apiUrl, {
                    headers: {
                        'api-key': 'bdc3edea33ca1027196ef4ad1b16d01a'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Scripture not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('API Response:', data);
                        
                        if (verse && data.data) {
                            // Single verse
                            const reference = `${bookInfo.name} ${chapter}:${verse}`;
                            addScriptureToNote({ reference, text: data.data.content });
                        } else if (data.data) {
                            // Entire chapter
                            const reference = `${bookInfo.name} ${chapter}`;
                            addScriptureToNote({ reference, text: data.data.content });
                        } else {
                            throw new Error('No scripture data found in response');
                        }
                        
                        showNotification('Scripture added successfully!', 'success');
                    })
                    .catch(error => {
                        console.error('Error fetching scripture:', error);
                        // Fallback to public Bible API
                        fallbackFetchScripture(bookInfo.name, chapter, verse, version);
                    })
                    .finally(() => {
                        // Reset button state
                        fetchVerseBtn.innerHTML = originalText;
                        fetchVerseBtn.disabled = false;
                    });
            }
            
            function getBibleId(version) {
                const versionMap = {
                    'kjv': 'de4e12af7f28f599-02',
                    'asv': '06125adad2d5898a-01',
                    'web': '9879dbb7cfe39e4d-04',
                    'bbe': 'a8a467b6b0a2211d-01'
                };
                return versionMap[version] || 'de4e12af7f28f599-02'; // Default to KJV
            }
            
            function fallbackFetchScripture(bookName, chapter, verse, version) {
                let apiUrl;
                if (verse) {
                    // Fetch specific verse using public API
                    apiUrl = `https://bible-api.com/${bookName}+${chapter}:${verse}?translation=${version}`;
                } else {
                    // Fetch entire chapter
                    apiUrl = `https://bible-api.com/${bookName}+${chapter}?translation=${version}`;
                }
                
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Scripture not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Fallback API Response:', data);
                        
                        if (data.verses && data.verses.length > 0) {
                            if (verse) {
                                // Single verse
                                const verseData = data.verses[0];
                                const reference = `${verseData.book_name} ${verseData.chapter}:${verseData.verse}`;
                                addScriptureToNote({ reference, text: verseData.text });
                            } else {
                                // Entire chapter
                                const reference = `${data.reference}`;
                                let fullText = '';
                                
                                data.verses.forEach(v => {
                                    fullText += `<strong>${v.verse}.</strong> ${v.text}\n`;
                                });
                                
                                addScriptureToNote({ reference, text: fullText });
                            }
                            
                            showNotification('Scripture added successfully!', 'success');
                        } else {
                            throw new Error('No verses found in response');
                        }
                    })
                    .catch(error => {
                        console.error('Error with fallback API:', error);
                        showNotification('Error fetching scripture. Please try another reference.', 'error');
                    });
            }
            
            function addScriptureToNote(verse) {
                const scriptureElement = document.createElement('div');
                scriptureElement.className = 'bible-quote';
                scriptureElement.innerHTML = `
                    <button class="delete-scripture">
                        <i class="fas fa-times"></i>
                    </button>
                    <div>${verse.text}</div>
                    <span class="reference">${verse.reference}</span>
                `;
                
                // Add delete functionality
                const deleteBtn = scriptureElement.querySelector('.delete-scripture');
                deleteBtn.addEventListener('click', function() {
                    deleteScripture(scriptureElement);
                });
                
                scriptureContainer.appendChild(scriptureElement);
                
                // Add reference to note content
                if (noteEditor.value) {
                    noteEditor.value += `\n\n[${verse.reference}]`;
                } else {
                    noteEditor.value = `[${verse.reference}]`;
                }
                
                // Scroll to the new scripture
                scriptureElement.scrollIntoView({ behavior: 'smooth' });
            }
            
            function showBibleSearch() {
                bibleBookSelect.focus();
            }
            
            function autoReferenceScriptures() {
                const content = noteEditor.value;
                const scriptureRefs = content.match(/\[(.*?)\]/g);
                
                if (scriptureRefs) {
                    showNotification('Searching for scripture references...', 'info');
                    
                    scriptureRefs.forEach(ref => {
                        const cleanRef = ref.replace(/[\[\]]/g, '');
                        
                        // Check if this reference already exists in scriptures
                        if (!scriptureContainer.innerHTML.includes(cleanRef)) {
                            // Parse the reference (simple version)
                            const match = cleanRef.match(/(\d?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
                            if (match) {
                                const bookName = match[1];
                                const chapter = match[2];
                                const verse = match[3] || '';
                                
                                // Find the book key
                                let bookKey = '';
                                for (const testament in bibleStructure) {
                                    for (const key in bibleStructure[testament]) {
                                        if (bibleStructure[testament][key].name.toLowerCase().includes(bookName.toLowerCase())) {
                                            bookKey = key;
                                            break;
                                        }
                                    }
                                    if (bookKey) break;
                                }
                                
                                if (bookKey) {
                                    // Fetch the scripture
                                    setTimeout(() => {
                                        bibleBookSelect.value = bookKey;
                                        bibleChapter.value = chapter;
                                        bibleVerse.value = verse;
                                        fetchScripture();
                                    }, 500);
                                }
                            }
                        }
                    });
                } else {
                    showNotification('No scripture references found in your note.', 'info');
                }
            }
            
            function toggleHighlight() {
                showNotification('Select text and use Ctrl+H to highlight, or use the context menu', 'info');
            }
            
            // Study Tools Functions
            function showStudyTools() {
                studyToolsModal.style.display = 'flex';
            }
            
            function hideStudyTools() {
                studyToolsModal.style.display = 'none';
            }
            
            function switchStudyTab(tabId) {
                // Deactivate all tabs
                studyTabs.forEach(tab => tab.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Activate selected tab
                document.querySelector(`.study-tab[data-tab="${tabId}"]`).classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            }
            
            function searchWordStudy() {
                const word = wordStudyInput.value.trim().toLowerCase();
                if (!word) {
                    showNotification('Please enter a word to study', 'error');
                    return;
                }
                
                const result = wordStudyDatabase[word];
                if (result) {
                    wordStudyResults.innerHTML = `
                        <div class="word-study-item">
                            <h4>${word.charAt(0).toUpperCase() + word.slice(1)}</h4>
                            <div class="original-language">
                                <strong>Hebrew:</strong> ${result.hebrew}
                            </div>
                            <div class="original-language">
                                <strong>Greek:</strong> ${result.greek}
                            </div>
                            <p><strong>Definition:</strong> ${result.definition}</p>
                            <p><strong>Key Verses:</strong> ${result.verses.join(', ')}</p>
                        </div>
                    `;
                } else {
                    wordStudyResults.innerHTML = `
                        <div class="word-study-item">
                            <p>No detailed study available for "${word}". Try: faith, love, grace, hope, peace</p>
                        </div>
                    `;
                }
            }
            
            function searchCrossReferences() {
                const verse = crossRefInput.value.trim();
                if (!verse) {
                    showNotification('Please enter a verse to find cross references', 'error');
                    return;
                }
                
                const refs = crossReferences[verse];
                if (refs) {
                    let html = '';
                    refs.forEach(ref => {
                        html += `
                            <div class="cross-ref-item">
                                <p>${ref}</p>
                                <button class="btn-secondary" onclick="addCrossReference('${ref}')">
                                    <i class="fas fa-plus"></i> Add to Note
                                </button>
                            </div>
                        `;
                    });
                    crossReferenceResults.innerHTML = html;
                } else {
                    crossReferenceResults.innerHTML = `
                        <div class="cross-ref-item">
                            <p>No cross references found for "${verse}". Try: John 3:16, Psalm 23:1, Philippians 4:13</p>
                        </div>
                    `;
                }
            }
            
            function addCrossReference(verse) {
                // Parse the verse and add it to the note
                const match = verse.match(/(\d?\s?[A-Za-z]+)\s+(\d+):?(\d+)?/);
                if (match) {
                    const bookName = match[1];
                    const chapter = match[2];
                    const verseNum = match[3] || '';
                    
                    // Find the book key
                    let bookKey = '';
                    for (const testament in bibleStructure) {
                        for (const key in bibleStructure[testament]) {
                            if (bibleStructure[testament][key].name.toLowerCase().includes(bookName.toLowerCase())) {
                                bookKey = key;
                                break;
                            }
                        }
                        if (bookKey) break;
                    }
                    
                    if (bookKey) {
                        bibleBookSelect.value = bookKey;
                        bibleChapter.value = chapter;
                        bibleVerse.value = verseNum;
                        fetchScripture();
                        hideStudyTools();
                    }
                }
            }
            
            function searchCommentary() {
                const verse = commentaryInput.value.trim();
                if (!verse) {
                    showNotification('Please enter a verse for commentary', 'error');
                    return;
                }
                
                const commentary = commentaryDatabase[verse];
                if (commentary) {
                    commentaryResults.innerHTML = `
                        <div class="commentary-item">
                            <h4>${verse}</h4>
                            <p>${commentary}</p>
                        </div>
                    `;
                } else {
                    commentaryResults.innerHTML = `
                        <div class="commentary-item">
                            <p>No commentary available for "${verse}". Try: John 3:16, Psalm 23:1, Philippians 4:13, Romans 8:28</p>
                        </div>
                    `;
                }
            }
            
            function startReadingPlan() {
                const plan = readingPlanSelect.value;
                let planData = [];
                
                // Generate reading plan based on selection
                switch(plan) {
                    case 'chronological':
                        planData = [
                            "Genesis 1-3", "Genesis 4-7", "Genesis 8-11", "Job 1-5", "Job 6-10",
                            "Job 11-15", "Job 16-20", "Job 21-25", "Job 26-31", "Job 32-37"
                        ];
                        break;
                    case 'thematic':
                        planData = [
                            "John 1", "Romans 3", "Ephesians 2", "Titus 3", "1 John 1",
                            "Psalm 51", "Isaiah 53", "Micah 6", "Matthew 5", "Luke 15"
                        ];
                        break;
                    case 'new-testament':
                        planData = [
                            "Matthew 1-2", "Matthew 3-4", "Matthew 5-7", "Matthew 8-9", "Matthew 10-11",
                            "Matthew 12-13", "Matthew 14-15", "Matthew 16-17", "Matthew 18-19", "Matthew 20-21"
                        ];
                        break;
                    case 'psalms-proverbs':
                        planData = [
                            "Psalm 1-5", "Psalm 6-10", "Psalm 11-15", "Psalm 16-20", "Psalm 21-25",
                            "Proverbs 1", "Proverbs 2", "Proverbs 3", "Proverbs 4", "Proverbs 5"
                        ];
                        break;
                }
                
                let html = '';
                planData.forEach((reading, index) => {
                    const day = index + 1;
                    const isCompleted = readingProgress[plan] && readingProgress[plan][day];
                    html += `
                        <div class="reading-day ${isCompleted ? 'completed' : ''}" data-plan="${plan}" data-day="${day}" data-reading="${reading}">
                            Day ${day}<br>${reading}
                        </div>
                    `;
                });
                
                readingPlan.innerHTML = html;
                
                // Add click events to reading days
                readingPlan.querySelectorAll('.reading-day').forEach(day => {
                    day.addEventListener('click', function() {
                        const plan = this.getAttribute('data-plan');
                        const dayNum = this.getAttribute('data-day');
                        const reading = this.getAttribute('data-reading');
                        
                        // Mark as completed
                        if (!readingProgress[plan]) readingProgress[plan] = {};
                        readingProgress[plan][dayNum] = !readingProgress[plan][dayNum];
                        localStorage.setItem('readingProgress', JSON.stringify(readingProgress));
                        
                        // Update UI
                        this.classList.toggle('completed');
                        
                        // Add to note if not completed
                        if (!readingProgress[plan][dayNum]) {
                            const noteContent = `Reading for Day ${dayNum}: ${reading}`;
                            if (noteEditor.value) {
                                noteEditor.value += `\n${noteContent}`;
                            } else {
                                noteEditor.value = noteContent;
                            }
                            saveNote();
                        }
                    });
                });
            }
            
            function addPrayerRequest() {
                const request = prayerInput.value.trim();
                if (!request) {
                    showNotification('Please enter a prayer request', 'error');
                    return;
                }
                
                prayerRequests.push({
                    id: Date.now(),
                    text: request,
                    date: new Date().toISOString(),
                    answered: false
                });
                
                localStorage.setItem('prayerRequests', JSON.stringify(prayerRequests));
                renderPrayerList();
                prayerInput.value = '';
                showNotification('Prayer request added', 'success');
            }
            
            function renderPrayerList() {
                prayerList.innerHTML = '';
                
                if (prayerRequests.length === 0) {
                    prayerList.innerHTML = '<p>No prayer requests yet. Add your first prayer request!</p>';
                    return;
                }
                
                prayerRequests.forEach(request => {
                    const prayerItem = document.createElement('div');
                    prayerItem.className = 'prayer-item';
                    prayerItem.innerHTML = `
                        <div>
                            <p>${request.text}</p>
                            <small>${new Date(request.date).toLocaleDateString()}</small>
                        </div>
                        <div class="prayer-actions">
                            <button class="btn-secondary" onclick="togglePrayerAnswered(${request.id})">
                                <i class="fas fa-${request.answered ? 'check' : 'clock'}"></i>
                            </button>
                            <button class="btn-danger" onclick="deletePrayerRequest(${request.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                    prayerList.appendChild(prayerItem);
                });
            }
            
            function togglePrayerAnswered(id) {
                const request = prayerRequests.find(r => r.id === id);
                if (request) {
                    request.answered = !request.answered;
                    localStorage.setItem('prayerRequests', JSON.stringify(prayerRequests));
                    renderPrayerList();
                    showNotification(`Prayer request ${request.answered ? 'marked as answered' : 'marked as pending'}`, 'info');
                }
            }
            
            function deletePrayerRequest(id) {
                if (confirm('Delete this prayer request?')) {
                    prayerRequests = prayerRequests.filter(r => r.id !== id);
                    localStorage.setItem('prayerRequests', JSON.stringify(prayerRequests));
                    renderPrayerList();
                    showNotification('Prayer request deleted', 'info');
                }
            }
            
            function exportNote() {
                if (!currentNoteId) {
                    showNotification('No note to export', 'error');
                    return;
                }
                
                const note = notes.find(n => n.id === currentNoteId);
                if (!note) return;
                
                const content = `${note.title}\n\n${note.content}\n\n${scriptureContainer.textContent || ''}`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${note.title}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showNotification('Note exported successfully!', 'success');
            }
            
            function checkOnlineStatus() {
                if (!navigator.onLine) {
                    offlineIndicator.style.display = 'block';
                }
            }
            
            function showNotification(message, type) {
                notification.textContent = message;
                notification.style.display = 'block';
                notification.style.background = type === 'error' ? 
                    'var(--danger)' : type === 'warning' ? 
                    'var(--warning)' : type === 'info' ? 
                    'var(--secondary)' : 'var(--success)';
                
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
            }
            
            // Create a sample note if no notes exist
            if (notes.length === 0) {
                createNewNote();
                noteTitle.value = "Welcome to BibleNotes!";
                noteEditor.value = "This is your free Bible note-taking app with complete scripture integration and advanced study tools.\n\nTry the Study Tools button to access:\n- Word Studies with original languages\n- Cross References\n- Bible Commentary\n- Reading Plans\n- Prayer List\n\nAll features are completely free!";
                saveNote();
            } else {
                // Load the most recent note
                const mostRecentNote = notes.reduce((prev, current) => {
                    return (new Date(prev.updatedAt || prev.createdAt) > new Date(current.updatedAt || current.createdAt)) ? prev : current;
                });
                loadNote(mostRecentNote.id);
            }
            
            // Make functions available globally for inline event handlers
            window.deleteNote = deleteNote;
            window.addCrossReference = addCrossReference;
            window.togglePrayerAnswered = togglePrayerAnswered;
            window.deletePrayerRequest = deletePrayerRequest;
        });