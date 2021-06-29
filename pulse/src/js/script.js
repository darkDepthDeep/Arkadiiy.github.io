$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/Carousel/arrow_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/Carousel/arrow_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
            }
            }
        ]
      });
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
          }); 
      }
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal

      $('[data-modal=consultation]').on('click', function() { // кликаем на дата атрибут consultation
        $('.overlay, #consultation').fadeIn('slow'); // выводим на экран элементы с классом .overlay, #consultation. Slow значит медленно
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow'); // То же самое что и выше, только fadeOut - значит закрывать (скрывать).
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
      });

      // Валидация форм

      // $('#consultation-form').validate();  // Изначально скачиваем с jQuery validation файл jquery.validate.min.js, подключаем его в html!
      // $('#consultation form').validate({   // Дальше берем id форм и прописываем валидацию
      //   rules: {                           // здесь прописываем настройки
      //     name: {
      //       required: true,
      //       minlength: 2
      //     },                // Каждого отдельного inputa мы прописываем его name и значение required говорит что мы должны заполнить форму чтобы отправить.
      //     phone: "required",
      //     email: {
      //       required: true,
      //       email: true
      //     }
      //   },
      //   messages: {
      //     name: {
      //       required: "Пожалуйста, введите свое имя",
      //       minlength: jQuery.validator.format("Введите {0} символа!")
      //     },
      //     phone: "Пожалуйста, введите свой номер телефона",
      //     email: {
      //       required: "Пожалуйста, введите свою почту",
      //       email: "Неправильно введен адрес почты"
      //     }
      //   }
      // });
      // $('#order form').validate();

      function valideForms(form) {
        $(form).validate({                   // Дальше берем id форм и прописываем валидацию
          rules: {                           // здесь прописываем настройки
          name: {
              required: true,
              minlength: 2
            },                                // Каждого отдельного inputa мы прописываем его name и значение required говорит что мы должны заполнить форму чтобы отправить.
          phone: "required",
          email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожалуйста, введите свое имя",
              minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
        });
      }
      
      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");  // Маска ввода номера на сайте

      // Отправка писем

      $('form').submit(function(e) {     // Говорим когда формы будут подтверждаться, когда все валидации выполнены формы будут отправляться, когда это произошло я хочу выполнить действие прописывая функцию. У функции будет дополнительный аргумент (e) - ивент
        e.preventDefault();              // Отменяет стандартное поведение браузера
        $.ajax({
          type: "POST",                  // Здесь мы говорим, хотим получить или отдать данные серверу, POST - отдавать
          url: "../mailer/smart.php",
          data: $(this).serialize()      // Мы отправляем данные и (this) говорит что если мы отправили вторую форму то с данными второй формы и работаем
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.ovarlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });    
        return false;                     
      });

      // скрипты для плавного скролла вверх стрелки справа внизу

      $(window).scroll(function() {          // window -рабочий экран, при скролле будет выполняться функция
        if ($(this).scrollTop() > 1600) {    // если мы все скроллим больше 1600 пикселей то
          $('.pageup').fadeIn();             // тогда мы элемент с классом pageup показываем 
        } else {
          $('.pageup').fadeOut();            // иначе если не пролистает 1600 пикселей то он будет скрываться
        }
      });

      $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");  // мы берем ту ссылку на которую нажали (this) прописываем её атрибут и берем атрибут который есть в href
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

      new WOW().init();
  });