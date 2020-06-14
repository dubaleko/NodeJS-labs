exports.index = function (request, response) {
    response.render("main.hbs");
};
exports.about = function (request, response) {
    response.send("О сайте");
};