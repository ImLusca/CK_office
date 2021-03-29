$('#car-recursos').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        700:{
            items:2
        },
        1300:{
            items:3
        }
    }
})


$("#car-beneficios").owlCarousel({

  navigation : true, // Show next and prev buttons

  slideSpeed : 300,
  paginationSpeed : 400,
  nav:false,
  paginations: false,
  dots:false,

  items : 1, 
  itemsDesktop : false,
  itemsDesktopSmall : false,
  itemsTablet: false,
  itemsMobile : false

});


var $alvo = $('.inicio-esq, .inicio-dir, .inicio-bot')    
function animeScroll() {
  var docTop = $(document).scrollTop();

  $alvo.each(function(){
    var itemTop = $(this).offset().top - $(window).height()*3/4 ;
    if(docTop > itemTop) {
      $(this).addClass('final')
    } else{
      $(this).removeClass('final')
    }
    
  });
  if (docTop > $('#video iframe').offset().top - $(window).height()*5/4){
    if($('#video iframe').attr('src') == ''){
      $('#video iframe').attr('src','https://www.youtube.com/embed/deIijknhlK8')
    }
  }
};   




var numero = document.getElementById('num-func'),
numero2 = document.getElementById('num-func2'),
valor = document.getElementById('n_val'),
inicial = 250,cust_lic = 15,maximo= 200,minimo = 5;

$('.seta-esquerda').click(function(){
  if($('.ativo').data('plano') !== 3){
    if ($(this).is('.seta-invertida')){
      if (parseInt(numero.innerHTML) < maximo){
        numero.innerHTML = parseInt(numero.innerHTML) + 1
      }
    } else{ 
      if (parseInt(numero.innerHTML) > minimo) {
        numero.innerHTML = parseInt(numero.innerHTML) - 1          
      }
    }
    document.getElementById('val-range').value = numero.innerHTML
    numero2.innerHTML= numero.innerHTML
    $('#inp_licencas').val(numero.innerHTML) 
    valor.innerHTML = 'R$ ' + String(inicial + ((parseInt(numero.innerHTML) - minimo) * cust_lic)) + ',00'
  }

});

$('input[type=range]').on('input', function () {
  $(this).trigger('change');
  $(numero).html($(this).val());
  numero2.innerHTML = numero.innerHTML
  $('#inp_licencas').val(numero.innerHTML) 
  valor.innerHTML = 'R$ ' + String(inicial + ((parseInt(numero.innerHTML) - minimo) * cust_lic)) + ',00'
});

$(document).scroll(function(){
  animeScroll();
});

$('#inp_plano').val('Pro')
$('#inp_licencas').val('5')

$(".card input").blur(function () {
    console.log($(this).val())
    if ($(this).val() != "") {
        $("label[for=\"" + $(this).attr("id") + "\"]").css('top', '-1.8rem');
        $("label[for=\"" + $(this).attr("id") + "\"]").css('color', '#0a6d62');
    } else {
        $("label[for=\"" + $(this).attr("id") + "\"]").css('top', '0');
        $("label[for=\"" + $(this).attr("id") + "\"]").css('color', '#212529');
    }
})

$('.tipo-plano').click(function(){
  var card = ('.pilha[data-plano=' + $(this).data('plano') +']');

  $('.ativo').removeClass('ativo');

  setTimeout(function(){
    $(card).addClass('ativo');
    if ($(card).data('plano') == 0) {
      numero.innerHTML = 1;
      numero2.innerHTML = 1;
      document.getElementById('val-range').value = 1;
      document.getElementById('val-range').max = 0;
      minimo = 1;
      maximo = 1;          
      custo_lic = 0;
      inicial = 0;
      valor.innerHTML = 'R$ 0,00';
      $('#inp_licencas').val(numero.innerHTML)
      $('#inp_plano').val('7 dias grátis')
    } else if($(card).data('plano') == 1) {
      minimo = 5;
      numero.innerHTML = minimo;
      numero2.innerHTML = minimo;
      document.getElementById('val-range').min = minimo;
      document.getElementById('val-range').max = 200;
      document.getElementById('val-range').value = minimo;
      maximo = 200;   
      inicial = 180;
      custo_lic = 20;
      valor.innerHTML = 'R$ ' + String(inicial + ((parseInt(numero.innerHTML) - minimo) * cust_lic)) + ',00'
      $('#inp_plano').val('Pro')
    }else if($(card).data('plano') == 2) {
      minimo = 5;          
      numero.innerHTML = minimo;
      numero2.innerHTML = minimo;
      document.getElementById('val-range').max = 200;
      document.getElementById('val-range').min = minimo;
      document.getElementById('val-range').value = minimo;
      maximo = 200;   
      inicial = 250;
      custo_lic = 15;
      valor.innerHTML = "R$ " + String(inicial + ((parseInt(numero.innerHTML) - minimo)) * cust_lic) + ",00"
      $('#inp_plano').val('Premium')
    } else {
      numero.innerHTML = '200+';
      numero2.innerHTML = '200+';
      document.getElementById('val-range').max = 200;
      document.getElementById('val-range').min = 200;
      document.getElementById('val-range').value = 200;
      maximo = 200; 
      minimo = 200;
      inicial = 0;
      custo_lic = 0;  
      valor.innerHTML = "Negociável "
      $('#inp_plano').val('Personalizado')
    }
    
  },500);
});

function redimensionamento(){
  $('.planos .pilha, .planos, .tipos-planos .tipo-plano').removeAttr('Style');
  if($('body').innerWidth() > 767 ){
    $('.planos .pilha, .planos').height($('#precos .card').innerHeight());   
    $('.tipos-planos .tipo-plano').width($('.tipos-planos .tipo-plano').innerHeight());   
  }else{
    $('.planos .pilha, .planos').height($('.planos .pilha[data-plano=3]').innerHeight()+ 50);
    $('.tipos-planos .tipo-plano').height($('.tipos-planos .tipo-plano').innerWidth());
  };
};
    
$(document).ready(redimensionamento());

var tempo;
window.onresize = function(){
  clearTimeout(tempo);
  tempo = setTimeout(redimensionamento,100)
}

$('.card .fliper').click(function(){
  $('#precos .card .frente').css({transform:'rotateY(180deg)'});
  $('#precos .card .verso').css({transform: 'rotateY(360deg)'});
});

$('#precos .card .verso img').click(function(){
  $('#precos .card .frente').css({transform: 'rotateY(360deg)'});
  $('#precos .card .verso').css({transform:' rotateY(180deg)'});
});

$('#enviar_cotacao').on('click', ()=>{

  $('#inp_nome').attr('readonly', true);
  $('#inp_telefone').attr('readonly', true);
  $('#inp_email').attr('readonly', true);
  $('#inp_licencas').attr('readonly', true);
  $('#inp_cnpj').attr('readonly', true);
  $('#precos .card .frente').css({transform: 'rotateY(360deg)'});
  $('#precos .card .verso').css({transform:' rotateY(180deg)'});
  // $('#enviar_cotacao').css('display','none');
  $('#btn_msg_2').fadeOut(200);
  $('#enviar_cotacao').off('click');
  mostra_msg('Sua cotação foi enviada.Logo entraremos em contato ;)');
});


$('#btn_msg_2').on('click',()=>{  
  $('#inp_nome_msg').attr('readonly', true);
  $('#inp_email_msg').attr('readonly', true);
  $('#inp_numero').attr('readonly', true);
  $('#inp_mensagem').attr('readonly', true);
  $('#btn_msg_2').fadeOut(200);
  $('#btn_msg_2').off('click');
  mostra_msg('Sua mensagem foi enviada.Logo entraremos em contato');  
})


function mostra_msg(mensagem){
  Command: toastr["success"](mensagem,"Enviada!")

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}