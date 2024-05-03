        var shell = document.querySelector('.shell');
        var tuan = document.querySelector('.tuan');

        shell.addEventListener('mouseenter', function() {
        tuan.classList.add('hover');
        });

        shell.addEventListener('mouseleave', function() {
        tuan.classList.remove('hover');
        });