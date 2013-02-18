$(function() {
    switch(viewState) {
        case 'home':
            var homeView = new App.views.HomeView();
            homeView.render();
            break;
        case 'personal':
            var appView = new App.views.AppView();
            appView.render();
            break;
        default:
            break;
    }
});
