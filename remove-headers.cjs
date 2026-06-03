const fs = require('fs');
let text = fs.readFileSync('src/routes/lessons.$lessonId.tsx', 'utf8');

// Remove all <p className=\"text-xs font-bold text-muted-foreground\">...</p> blocks
text = text.replace(/<p className=\"text-xs font-bold text-muted-foreground\">[\s\S]*?<\/p>/g, '');

// Remove all <div className=\"text-[10px] font-bold text-foreground\/40 uppercase tracking-wider px-1\">{row.label}</div>
text = text.replace(/<div className=\"text-\[10px\] font-bold text-foreground\/40 uppercase tracking-wider px-1\">\s*\{row\.label\}\s*<\/div>/g, '');

// Remove the Sonderbuchstaben header
text = text.replace(/<div className=\"text-\[10px\] font-black text-primary uppercase tracking-wider px-1 flex items-center gap-1\">\s*<span>Sonderbuchstaben<\/span>\s*<\/div>/g, '');

// Remove {lesson.intro} blocks
text = text.replace(/<p className=\"text-base sm:text-lg font-black text-foreground\">\s*\{lesson\.intro\}\s*<\/p>/g, '');

fs.writeFileSync('src/routes/lessons.$lessonId.tsx', text);
console.log('Success');
