const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push((employees
    .filter(employee => employee.userRole() === "Manager")
    .map(manager => renderManager(manager))
  ).join(""));
  html.push((employees
    .filter(employee => employee.userRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  ).join(""));
  html.push((employees
    .filter(employee => employee.userRole() === "Intern")
    .map(intern => renderIntern(intern))
  ).join(""));
  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.userName());
  template = replacePlaceholders(template, "role", manager.userRole());
  template = replacePlaceholders(template, "email", manager.userEmail());
  template = replacePlaceholders(template, "id", manager.userId());
  template = replacePlaceholders(template, "officeNumber", manager.managerOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.userName());
  template = replacePlaceholders(template, "role", engineer.userRole());
  template = replacePlaceholders(template, "email", engineer.userEmail());
  template = replacePlaceholders(template, "id", engineer.userId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.userName());
  template = replacePlaceholders(template, "role", intern.userRole());
  template = replacePlaceholders(template, "email", intern.userEmail());
  template = replacePlaceholders(template, "id", intern.userId());
  template = replacePlaceholders(template, "school", intern.userSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;