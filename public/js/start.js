$(function() {
    // Render all of the chosen ui components
    $(".chzn-select").chosen();

    var appView = new App.views.AppView();
    appView.render();
});
