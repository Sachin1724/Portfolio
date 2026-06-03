const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'components');

function walkDir(d) {
    let results = [];
    const list = fs.readdirSync(d);
    list.forEach((file) => {
        file = path.join(d, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(dir);

const replacements = [
    { from: /rgba\(255,\s*255,\s*255,\s*0\.04\)/g, to: 'var(--glass-bg)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.01\)/g, to: 'var(--glass-bg-subtle)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.1\)/g, to: 'var(--glass-bg-hover)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.02\)/g, to: 'var(--glass-bg-active)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.06\)/g, to: 'var(--glass-border)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.08\)/g, to: 'var(--glass-border-light)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.05\)/g, to: 'var(--glass-border-dim)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.03\)/g, to: 'var(--glass-border-subtle)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.75\)/g, to: 'var(--glass-text-dim)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.7\)/g, to: 'var(--glass-text-dim)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.85\)/g, to: 'var(--glass-text-icon)' },
    { from: /rgba\(255,\s*255,\s*255,\s*0\.15\)/g, to: 'var(--glass-text-muted)' }
];

let filesModified = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log('Updated: ' + path.basename(file));
        filesModified++;
    }
});

console.log(`Finished. Modified ${filesModified} files.`);
