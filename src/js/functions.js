
    
$(document).ready(function () {

    // $("#modalAviso").modal().show;

    function menuSticky() {
        var posSection = $("main");
  
        $(document).scroll(function () {
          posSection.each(function () {
            var posRow = $(this).offset().top;
            var scrolleo = $(window).scrollTop();
  
            if (scrolleo > posRow) {
              $(".header").addClass("activo");
            } else {
              $(".header").removeClass("activo");
            }
          });
        });
    }

    menuSticky();
    
    function validacionSesion(){
        $('.home .botonera a').on("click", function (e) {
            // CHECKBOX
               if($('#checkEdad').prop("checked") == false){
                   $('.msjError').remove();
                   $('#cajaEdad').append('<span class="msjError" > Debes ser mayor de 18 años. </span>');
                   e.preventDefault();
               }

               else if($('#checkLegale').prop("checked") == false){
                    $('.msjError').remove();
                    $('#cajaLegal').append('<span class="msjError" > Debes aceptar los términos y condiciones. </span>');
                    e.preventDefault();
                }
               
               else {
                   $('.msjError').remove();
                   $(".registro .form img").addClass("imgOn");
               }
               
               // VALIDATE ALL
   
               if ($('.ticket .error-input').length == 0) {
                //    window.location.href = "/completar-registro"
               }

       });
    }

    validacionSesion();


     /// ANCLAS

     function anclas(){
        $(".home--pleca h4").on("click", function () {
            $("html, body").animate({ scrollTop: $(".sesion").offset().top - 200 }, 1500);
        });
    }

    anclas();


    // CARRUSELES

    function carrusel(){
        var mySwiper = new Swiper("#slider", {
            autoplay:true,
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    carrusel()

    /// FORMULARIOS

    function inputs(){
        $(".form__input input, .form__input select").focus(function () {
            $(this).parents(".form__input").addClass("on");
        });

        $(".form__input input, .form__input select").blur(function () {
            
            if($(this).val()===""){
                $(this).parents(".form__input").removeClass("on");
            } else{
                $(this).parents(".form__input").addClass("on");
            }
            
        });
    }

    inputs();

    function uploadFile(){
        $("#img_ticket").on("change",function(e) { 
            var filename = e.target.files[0].name; 
            $("#btnFileFalse span").text( filename);
        });
    }

    uploadFile();

    ////////// REGEX FORMS ///////////

    /// TEXTO

    function valText(nameInput) {

        var regEx = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
        var validText = regEx.test(nameInput.val());

        if (nameInput.val().length < 1) {
            nameInput.siblings("span").remove();
            nameInput.after("<span class='msjError'>Campo requerido");
        } else {
            nameInput.siblings("span").remove();

            if (!validText) {
                nameInput.siblings("span").remove();
                nameInput.after('<span class="msjError"> Solo se aceptan letras </span>');
                nameInput.siblings("span").show();
            } else {
                nameInput.siblings("span").remove();
            }
        }


    }

    /// NUMEROS

    function valNum(nameInput) {
        if (nameInput.val().length < 1) {
            nameInput.siblings("span").remove();
            nameInput.after("<span class='msjError'>Campo requerido");
        } else {

            var regEx = /^[0-9]+$/;

            var validEmail = regEx.test(nameInput.val());

            if (!validEmail) {
                nameInput.siblings("span").remove();
                nameInput.after('<span class="msjError"> Solo se permiten numeros </span>');
                nameInput.siblings("span").show();
            } else {
                nameInput.siblings("span").remove();
            }
        }
    }

    /// COMBOS

    function valCombos(nameInput){
        var combosContacto = $(nameInput);
        
        combosContacto.each(function () {
            $(this).change(function () {
                if ($(this).val() != null) {
                    $(this).siblings("span").remove();
                    
                }
            });

            if ($(this).val() == "") {
                $(this).siblings("span").remove();
                $(this).after('<span class="msjError"> Campo requerido </span>');
            }

        });

    }

    // COMPLETAR REGISTRO

    function completarRegistro(){
        $('#enviarRegistro').on("click", function() {

            var nombre = $("#nombre"),
                apellido = $("#apellido"),
                telefono = $("#telefono"),
                estado = $("#selecEdo");
    
            valText(nombre);
            valText(apellido);
            valNum(telefono);
            valCombos(estado);

             // VALIDATE ALL

            if ($('#formCompletarRegistro .msjError').length == 0) {
                $("#formCompletarRegistro").submit();
                window.location.href="/gracias-registro/";
            }

            return false;
        });
    }

    completarRegistro();

    /// HEADER

    function header(){
        $(".header--navegacion .btn").on("click", function () {
            $(".header").toggleClass("headerOn");
            $(this).toggleClass("nav-on");
        });
    
        $("#header--logo").on("click", function () {
            history.replaceState(null, null, ' ');
    
            $("html, body").animate({ scrollTop: 0 }, 1500);
            $(".header--navegacion .btn").removeClass("nav-on");
            $(".navbar-collapse").removeClass("show");
            $(".header").removeClass("headerOn");
    
        });
    
        $("#navbarNav li").on("click", function () { 
            var nameLi = $(this).attr("id").replace("li-", ""),
                nameSection = $("." + nameLi).offset().top;
            
            $("html, body").animate({ scrollTop: nameSection = $("." + nameLi).offset().top - 90 }, 1500);
            
            $(".header--navegacion .btn").removeClass("nav-on");
            $(".navbar-collapse").removeClass("show");
            
            $("#navbarNav li").removeClass("activo");
            $(this).addClass("activo");
    
            $(".header").removeClass("headerOn");
    
            return false;
            
        });
    
        var posSection = $("section");
    
        $(document).scroll(function () {
            posSection.each(function () {
                var posRow = $(this).offset().top - 150;
                var scrolleo = $(window).scrollTop();
                var nameLi = $(this).attr("class").replace("s", "li-s");
    
                if (scrolleo > posRow) {
                    $("#navbarNav li").removeClass("activo");
                    $("#"+nameLi).addClass("activo");
                }
                
            });
            
        });
    }
   
     /// EFECTOS

    function efectoFade() {
        
        function sectionFade() {
            var sectionFade = $(".sectionFade");
            sectionFade.each(function () {
                var posSection = $(this).offset().top - 450;
                var scrolleo = $(window).scrollTop();
 
                if (scrolleo > posSection) {
                    $(this).find($(".objetFade")).addClass("transition1");
                } else {
                    $(this).find($(".objetFade")).removeClass("transition1");
                }
 
            });
        }
       
        sectionFade();
        
        $(document).scroll(function() {
            sectionFade();
        });
    }
    
    
    // FORMULARIO

    function formularios(){
        $(".checkboxes").on("click", function () {
            if ( $(this).find("input").attr("checked")) {
                $(this).find("input").removeAttr("checked");    
            }
    
            else {
                $(this).find("input").attr("checked","checked");
            }
            
        });
    
        $("#selectEdo").on("change", function () {
            $("#linkBoton").attr({ "href": $(this).val(), "target": "_blank" });
            $("#errorCombo").remove();
        });
    
        $("#boton-buscar").on("click", function () {
    
            if ($("#selectEdo").val() == null) {
                $("#errorCombo").remove();
                $(".combo").after("<span class='error-input' id='errorCombo'>Elige un estado");
            }
    
            else {
                $("#errorCombo").remove();
                
                if ($(".checkbox[checked]").length == 2) {
                    $("#errorLegales").remove();
                    var data = "Especialista-" + jQuery("#selectEdo option:selected").text();
    
                    dataLayer.push({ 
                        'event': data
                    });
                    
                    return true;
                }
        
                else{
                    $("#errorLegales").remove();
                    $("#checkTerminos").after("<span class='error-input' id='errorLegales'>Debes aceptar el Aviso de Privacidad y Términos y Condiciones");
                    
                    return false;
                }
            }
            
        });
    }
    

    /// COMBO DATA LAYER
    
    // (function() {
    //     var selectMenu = document.querySelector('#selectEdo');
    //     var callback = function(e) {
    //     var selectedOption = selectMenu.options[selectMenu.selectedIndex].id;
    
    //       window.dataLayer.push({
    //         event: selectedOption,
    //         // selectedElement: selectedOption
    //       });
    
    //     };
    
    //     selectMenu.addEventListener('change', callback, true);
    
    // })();

    
    // ACORDEON PLUS
    $('.acordeon').on('click',function(){
        $(this).toggleClass('active');
        // $(this).removeClass('active');
    });

});

    

