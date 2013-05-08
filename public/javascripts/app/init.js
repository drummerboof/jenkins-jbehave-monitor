window.JJBA = {};
window.JJBA.Views = {};
window.JJBA.Models = {};
window.JJBA.Collections = {};

$(document).ready(function () {
    window.app = new JJBA.Views.App({
        io: io,
        url: window.location.pathname
    });
    window.app.render();
});
