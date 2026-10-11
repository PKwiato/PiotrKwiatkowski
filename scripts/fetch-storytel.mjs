import fs from 'node:fs';
import path from 'node:path';

// Parse CSV with quoted strings support
function parseCSV(csvText) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentLine.push(currentField.trim());
      if (currentLine.some(f => f.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(f => f.length > 0)) {
      lines.push(currentLine);
    }
  }

  const [header, ...rows] = lines;
  return rows.map(row => {
    const obj = {};
    header.forEach((col, idx) => {
      obj[col] = row[idx] || '';
    });
    return obj;
  });
}

async function fetchStorytelBook(isbn, title) {
  // Try search by ISBN first
  if (isbn && isbn.length >= 8) {
    try {
      const url = `https://www.storytel.com/pl/pl/api/search.action?q=${encodeURIComponent(isbn)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.books && data.books.length > 0) {
          const match = data.books[0];
          return {
            source: 'isbn',
            title: match.book?.name || title,
            author: match.book?.authorsAsString || match.abook?.narratorAsString || '',
            narrator: match.abook?.narratorAsString || '',
            cover: match.book?.largeCover ? `https://www.storytel.com${match.book.largeCover}` : (match.book?.cover ? `https://www.storytel.com${match.book.cover}` : null),
            duration: match.abook?.lengthInHHMM || '',
            rating: match.book?.grade || null,
            shareUrl: match.shareUrl || null,
            description: match.abook?.description || ''
          };
        }
      }
    } catch (e) {
      console.warn(`Error searching ISBN ${isbn}:`, e.message);
    }
  }

  // Fallback: search by title
  try {
    // Clean up title for search: take title before '.' or ':'
    const cleanTitle = title.replace(/\. Tom.*$/i, '').replace(/:.*$/, '').trim();
    const url = `https://www.storytel.com/pl/pl/api/search.action?q=${encodeURIComponent(cleanTitle)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.books && data.books.length > 0) {
        // Find best match
        const match = data.books[0];
        return {
          source: 'title',
          title: match.book?.name || title,
          author: match.book?.authorsAsString || '',
          narrator: match.abook?.narratorAsString || '',
          cover: match.book?.largeCover ? `https://www.storytel.com${match.book.largeCover}` : (match.book?.cover ? `https://www.storytel.com${match.book.cover}` : null),
          duration: match.abook?.lengthInHHMM || '',
          rating: match.book?.grade || null,
          shareUrl: match.shareUrl || null,
          description: match.abook?.description || ''
        };
      }
    }
  } catch (e) {
    console.warn(`Error searching title ${title}:`, e.message);
  }

  return null;
}

async function main() {
  const csvPath = path.resolve('src/data/listening-history.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parseCSV(csvContent);
  console.log(`Parsed ${records.length} records from CSV.`);

  const enrichedBooks = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const title = record['Tytuł książki'];
    const isbn = record['ISBN książki'];
    const progress = record['Aktualne miejsce w książce'];
    const progressPercent = parseInt(progress.replace('%', ''), 10) || 0;
    const format = record['Format'];
    const dateStarted = record['Data rozpoczęcia'];
    const dateFinished = record['Data dodania ostatniej zakładki'];
    const duration = record['Czas trwania książki'];

    console.log(`[${i + 1}/${records.length}] Fetching: ${title} (${isbn})...`);
    const storytelData = await fetchStorytelBook(isbn, title);

    const book = {
      id: isbn || `book-${i}`,
      rawTitle: title,
      title: storytelData?.title || title,
      author: storytelData?.author || '',
      narrator: storytelData?.narrator || '',
      cover: storytelData?.cover || null,
      isbn,
      format,
      progress: progressPercent,
      isFinished: progressPercent >= 90,
      duration: storytelData?.duration || duration,
      rating: storytelData?.rating || null,
      shareUrl: storytelData?.shareUrl || null,
      description: storytelData?.description || '',
      dateStarted,
      dateFinished
    };

    enrichedBooks.push(book);
    // Slight pause to be polite to Storytel
    await new Promise(r => setTimeout(r, 120));
  }

  const outputPath = path.resolve('src/data/storytel-books.json');
  fs.writeFileSync(outputPath, JSON.stringify(enrichedBooks, null, 2), 'utf-8');
  console.log(`Successfully saved ${enrichedBooks.length} books to ${outputPath}`);

  const withCovers = enrichedBooks.filter(b => b.cover);
  console.log(`Books with covers: ${withCovers.length} / ${enrichedBooks.length}`);
}

main().catch(console.error);
