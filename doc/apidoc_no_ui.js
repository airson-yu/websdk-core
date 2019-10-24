new Vue({
    el: '#app',
    data: {
        visible: false,
        grid: grid

    },
    methods:
        {
            show: function () {
                this.visible = true;
            }
        }
});