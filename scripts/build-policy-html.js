const fs = require('fs');
const path = require('path');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSectionHtml(section) {
  let html = `<h3>${escapeHtml(section.heading)}</h3>\n<p>${escapeHtml(section.content)}</p>`;
  if (section.list && section.list.length) {
    html += '\n<ul>';
    section.list.forEach((item) => {
      html += `<li>${escapeHtml(item)}</li>`;
    });
    html += '</ul>';
  }
  if (section.subsections && section.subsections.length) {
    section.subsections.forEach((sub) => {
      html += `\n<h4>${escapeHtml(sub.title)}</h4>\n<p>${escapeHtml(sub.content)}</p>`;
    });
  }
  if (section.contactInfo) {
    const c = section.contactInfo;
    html += `\n<p><strong>Email:</strong> <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></p>`;
    if (c.phone) html += `<p><strong>Phone:</strong> ${escapeHtml(c.phone)}</p>`;
    if (c.address) html += `<p><strong>Address:</strong> ${escapeHtml(c.address)}</p>`;
  }
  return html;
}

function buildPolicyHtml(data) {
  let html = '';
  if (data.introduction) {
    html += `<h2>${escapeHtml(data.introduction.heading)}</h2>\n<p>${escapeHtml(data.introduction.content)}</p>`;
  }
  if (data.sections && data.sections.length) {
    data.sections.forEach((section) => {
      html += '\n' + buildSectionHtml(section);
    });
  }
  return html;
}

const dataDir = path.join(__dirname, '../src/data');
const files = ['privacy-policy.json', 'terms-conditions.json', 'support-policy.json'];

files.forEach((file) => {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const content = buildPolicyHtml(data);
  const output = {
    title: data.title,
    lastUpdated: data.lastUpdated,
    company: data.company,
    content,
  };
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2), 'utf8');
  console.log('Updated', file);
});
