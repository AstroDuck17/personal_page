document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const basicStats = document.getElementById('basic-stats');
    const pronounsStats = document.getElementById('pronouns-stats');
    const prepositionsStats = document.getElementById('prepositions-stats');
    const articlesStats = document.getElementById('articles-stats');
    
    // Arrays of pronouns, prepositions, and indefinite articles for analysis
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself',
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'who', 'whom', 'whose', 'which', 'what',
        'this', 'that', 'these', 'those',
        'anyone', 'anybody', 'anything',
        'someone', 'somebody', 'something',
        'everyone', 'everybody', 'everything',
        'no one', 'nobody', 'nothing'
    ];
    
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
        'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'besides',
        'between', 'beyond', 'by', 'concerning', 'despite', 'down', 'during',
        'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near',
        'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'past',
        'regarding', 'round', 'since', 'through', 'throughout', 'to', 'toward',
        'towards', 'under', 'underneath', 'until', 'unto', 'up', 'upon',
        'with', 'within', 'without'
    ];
    
    const indefiniteArticles = ['a', 'an', 'some', 'any', 'many'];
    
    // Analyze button click event handler
    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value;
        
        if (text.trim() === '') {
            alert('Please enter some text for analysis.');
            return;
        }
        
        // Calculate basic text statistics
        const basicStatistics = calculateBasicStats(text);
        displayBasicStats(basicStatistics);
        
        // Tokenize text and analyze for specific parts of speech
        const tokens = tokenizeText(text);
        
        // Analyze and display pronouns
        const pronounCount = countPartsOfSpeech(tokens, pronouns);
        displayPartOfSpeechStats(pronounCount, pronounsStats);
        
        // Analyze and display prepositions
        const prepositionCount = countPartsOfSpeech(tokens, prepositions);
        displayPartOfSpeechStats(prepositionCount, prepositionsStats);
        
        // Analyze and display indefinite articles
        const articleCount = countPartsOfSpeech(tokens, indefiniteArticles);
        displayPartOfSpeechStats(articleCount, articlesStats);
    });
    
    // Clear button click event handler
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        clearResults();
    });
    
    // Calculate basic text statistics
    function calculateBasicStats(text) {
        return {
            letters: (text.match(/[a-zA-Z]/g) || []).length,
            words: text.trim().split(/\s+/).length,
            spaces: (text.match(/\s/g) || []).length,
            newlines: (text.match(/\n/g) || []).length,
            specialSymbols: (text.match(/[^\w\s]/g) || []).length
        };
    }
    
    // Display basic statistics
    function displayBasicStats(stats) {
        basicStats.innerHTML = `
            <div class="result-item">
                <span>Letters:</span>
                <span class="count">${stats.letters}</span>
            </div>
            <div class="result-item">
                <span>Words:</span>
                <span class="count">${stats.words}</span>
            </div>
            <div class="result-item">
                <span>Spaces:</span>
                <span class="count">${stats.spaces}</span>
            </div>
            <div class="result-item">
                <span>Newlines:</span>
                <span class="count">${stats.newlines}</span>
            </div>
            <div class="result-item">
                <span>Special Symbols:</span>
                <span class="count">${stats.specialSymbols}</span>
            </div>
        `;
    }
    
    // Tokenize text into words
    function tokenizeText(text) {
        // Convert text to lowercase and split by word boundaries
        return text.toLowerCase()
                  .replace(/[^\w\s']|_/g, " ")
                  .replace(/\s+/g, " ")
                  .trim()
                  .split(" ");
    }
    
    // Count occurrences of specific parts of speech
    function countPartsOfSpeech(tokens, partOfSpeechList) {
        const counts = {};
        
        // Initialize count for each item in the list
        partOfSpeechList.forEach(item => {
            counts[item] = 0;
        });
        
        // Count occurrences in tokens
        tokens.forEach(token => {
            if (partOfSpeechList.includes(token)) {
                counts[token]++;
            }
        });
        
        // Filter out items with zero count
        return Object.fromEntries(
            Object.entries(counts).filter(([_, count]) => count > 0)
        );
    }
    
    // Display part of speech statistics
    function displayPartOfSpeechStats(stats, container) {
        if (Object.keys(stats).length === 0) {
            container.innerHTML = '<p>No matches found.</p>';
            return;
        }
        
        // Sort by count (descending)
        const sortedStats = Object.entries(stats)
            .sort((a, b) => b[1] - a[1]);
        
        // Create HTML content
        let html = '';
        sortedStats.forEach(([item, count]) => {
            html += `
                <div class="result-item">
                    <span>${item}</span>
                    <span class="count">${count}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    // Clear all result displays
    function clearResults() {
        basicStats.innerHTML = '';
        pronounsStats.innerHTML = '';
        prepositionsStats.innerHTML = '';
        articlesStats.innerHTML = '';
    }
});