        var header = document.querySelector('.header');
        var tuan = document.querySelector('.tuan');

        header.addEventListener('mouseenter', function() {
        tuan.classList.add('hover');
        });

        header.addEventListener('mouseleave', function() {
        tuan.classList.remove('hover');
        });