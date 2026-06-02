const fs = require('fs');
const path = 'c:/Users/Hashir Mehboob/Desktop/German-Language-app/src/routes/lessons.$lessonId.tsx';
let content = fs.readFileSync(path, 'utf8');

// Match the specific full-width exercise buttons with gradient backgrounds
const regex = /<button\s+onClick=\{\(\) => setMode\("exercise"\)\}\s+className="w-full mt-[68] py-5 px-6 rounded-3xl bg-gradient-to-r from-primary to-orange-400 text-white font-black text-xl sm:text-2xl shadow-xl hover:shadow-2xl ring-4 ring-white transition-all transform hover:scale-\[1\.02\] active:scale-95 flex items-center justify-center gap-3 select-none cursor-pointer group"\s*>[\s\S]*?<\/button>/g;

const newButton = `<div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={() => setMode("exercise")}
                    title="Übung machen"
                    className="p-4 sm:p-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl ring-4 ring-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 group-hover:animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                  </button>
                </div>`;

const newContent = content.replace(regex, newButton);

if (content === newContent) {
  console.log('No matches found!');
} else {
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Replaced successfully!');
}
