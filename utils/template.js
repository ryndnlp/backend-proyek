const templateFunc = (template, args) => {
  return template.replace(/{([^{}]+)}/g, function (keyExpr, key) {
    return args[key] || "";
  });
};

module.exports = { templateFunc };
