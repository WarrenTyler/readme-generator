import inquirer from "inquirer";
import fs from "fs/promises";

const licenses = [
  {
    name: "MIT",
    shield: "https://img.shields.io/badge/License-MIT-green.svg",
    link: "https://choosealicense.com/licenses/mit/",
  },
  {
    name: "GPLv3",
    shield: "https://img.shields.io/badge/License-GPL%20v3-yellow.svg",
    link: "https://opensource.org/licenses/",
  },
  {
    name: "AGPL",
    shield: "https://img.shields.io/badge/license-AGPL-blue.svg",
    link: "http://www.gnu.org/licenses/agpl-3.0",
  },
];

// Get input from user
const response = await inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: "Enter a title",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter installation details",
    filter(val) {
      // use a tab to format a block in readme
      return addCodeBlock(val);
    },
    // display string with tabs removed
    transformer(val) {
      return removeCodeBlock(val);
    },
  },
  {
    type: "input",
    name: "usage",
    message: "Enter usage details",
    filter(val) {
      // use a tab to format a block in readme
      return addCodeBlock(val);
    },
    // display string with tabs removed
    transformer(val) {
      return removeCodeBlock(val);
    },
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter contributing information",
  },
  {
    type: "input",
    name: "tests",
    message: "Enter tests information",
  },
  {
    type: "input",
    name: "username",
    message: "Enter GitHub username",
  },
  {
    type: "input",
    name: "email",
    message: "Enter email address",
  },
  {
    type: "list",
    name: "license",
    message: "Please choose a license",
    choices: licenses.map((license) => license.name),
    filter(name) {
      return licenses.find((license) => license.name === name);
    },
  },
]);

// Seperate the items that vary and keep the rest together
const { title, license, email, username, ...sections } = response;

// Add the license badge at the top of readme
let readmeContent = `# ${title}\n
  [![${license.name} License](${license.shield})](${license.link})\n
`;

// Start the table of contents section
let tableContent = `## Table of contents
- [Table of contents](#table-of-contents)\n`;

// Start the sections contents section
let sectionContent = `\n`;

// Use a loop to fill in all generic details of table of contents and sections content
Object.keys(sections).forEach((key) => {
  const sectionName = key.replace(/^./, (str) => str.toUpperCase());

  tableContent += `- [${sectionName}](#${key})\n`;

  sectionContent += `### ${sectionName}\n${sections[key]}\n`;
});

// Add "Questions" and "License" links to table of contents
tableContent += `- [Questions](#questions)\n`;
tableContent += `- [License](#license)\n`;

// Add "Questions" to section content
sectionContent += `### Questions\nIf you have additional questions contact me via:\n\n`;
sectionContent += `[GitHub](https://github.com/${username})\n\n`;
sectionContent += `[Email](mailto:${email})\n`;

// Add "License" to section content
sectionContent += `### License\nDistributed under the [${license.name}](${license.link}) License\n`;

// Join all content together
readmeContent += tableContent + sectionContent;

// Create README in output folder
await fs.writeFile("./output/README.md", readmeContent);

// Inform user that file has been created
console.log("success!");

// FUNCTIONS --------------------------- //

// Turn text into a code block format for MD
function addCodeBlock(text) {
  return "```\n" + text + "\n```";
}

// Turn a MD formated code block into plain text 
function removeCodeBlock(text) {
  return `${text.replace(/```\n|\n```/g, "")}`;
}

