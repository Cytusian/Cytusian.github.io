//导航栏动画
window.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var wrap = document.querySelector('.wrap');
    // if(scrollTop >= 130){
    //     $(".wrap").addClass('active')
    //     // $(".wrap.active").find('img').attr('src','../images/2018/com_logo.png')
    // }else{
    //     $(".wrap").removeClass('active');
    //     // $(".wrap").find('img').attr('src','../images/2018/com_logo_f.png')
    // }
}

//回到顶部
$("#go_top").hover(

).click(function () {
    $('body,html').animate({ scrollTop: 0 }, 800);
});
$(window).scroll(function(){
    if($(this).scrollTop() > $(window).height()){
        $('.quick_bar').fadeIn();
    }else{
        $('.quick_bar').fadeOut();
    }
});


// //轮播swiper
// var swiper = new Swiper('.banner', {
//     pagination: '.swiper-pagination',
//     paginationClickable: '.swiper-pagination',
//     nextButton: '.swiper-button-next',
//     prevButton: '.swiper-button-prev',
//     spaceBetween: 30,
//     effect: 'fade',
//     autoplay: 5000,
//     loop: true,
//     autoplayDisableOnInteraction : false
// });

var headline_swiper = new Swiper('#headline_swiper', {
    pagination: '.swiper-pagination',
    paginationClickable: '.swiper-pagination',
    prevButton: '.swiper-button002-left',
    nextButton: '.swiper-button002-right',
    spaceBetween: 30,
    effect: 'fade',
    autoplay: 3000,
    loop: true,
    autoplayDisableOnInteraction : false
});
var business_swiper = new Swiper('#business_swiper', {
    //        3d覆盖流
    pagination: '.swiper-pagination',
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
    }
});

var license_swiper = new Swiper('#license-swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    // slidesPerGroup: 4,
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    // },
    autoplay: 2000,
    // loop: true,
    loopFillGroupWithBlank: true,
    autoplayDisableOnInteraction : false
});

var searchEvent = function (_index) {
    var input = $("#keyword");
    $("#submit-btn").click(function () {
		if (input.val() == '' && input.attr('placeholder') != '请输入关键字'){
			input.val(input.attr('placeholder'));
		}
        $("#topSearch").submit();
		input.val('')
    })

    if(_index == "1"){
		//楼盘默认搜索词
		var ph = $('#search-tag-xlp').attr('data-ph').split(",");
		var rand = parseInt(Math.random() * ph.length);
		//console.log(rand);
		input.attr('placeholder',ph[rand]);
        input.keyup(function () {
            var _this = $(this);
            if(_this.val() == ''){
                $('.sub_building').hide();
                $('.sub_building a').remove();
                return false;
            }
            houseMap.getBuildings(_this.val(),function (data) {
                if(data != '') {
                    $(".sub_building").show();
                    $(".sub_building a").remove();
                    $.each(data,function(i,item){
                        if (i >= 6 ){
                            $(".sub_building").css("height","150px");
                        }else{
                            $(".sub_building").css("height","auto");
                        }
                        if (i < 11){
                            $(".sub_building").append("<a id='" + item.id + "'>" + item.name + "</a>");
                        }
                    });
                    $(".sub_building a").click(function(){
                        alert(1)
                        input.val($(this).html());
                        $(this).parent().slideUp("fast");
                        $("#topSearch").submit();
                    });
                }else{
                    $(".sub_building a").remove();
                }

            })
        })
    }else {
        $('.sub_building').hide();
        input.unbind('keyup')
    }
}

//  滚动新闻
var scrollNews = function () {
    $(".slide").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        autoPage: true,
        effect: "top",
        autoPlay: true,
        vis: 1
    });
}

//  经过下拉
var selectShow = function () {
  var t = null
  $('.news-all').find('.news-detail').slideUp(function () {
    $('.news-all').eq(0).find('.news-detail').slideDown().addClass('active')
  }).end().mouseenter(function () {
    var e = $(this)
    e.hasClass("active") || (clearTimeout(t),
    t = setTimeout(function() {
        $(".news-all").removeClass("active").find(".news-detail").stop(!1, !0).slideUp(),
        e.addClass("active").find(".news-detail").slideDown()
    }, 50))
  })
}


// 汽车人，变形
var scrollMenu = function () {
    var t , e = !0;
    var s = $('.module-header-search')
    $(window).scroll(function () {
        e && (t = s.offset().top);
        var n = $(window).scrollTop() - 50;
        !s.hasClass('fixtop') && n > t ? (e = !1,
            s.addClass('fix-top')) : n < t && s.removeClass('fix-top')
    })
}

// 新房中心TAB切换
var switchTab = function () {
  var t = $('.right .tab-nav-item')
  var s = $('.right .tab-content')
  t.eq(0).addClass('tab-nav-active')
  s.eq(0).addClass('active')
  t.on('click', function () {
      var e = $('.index-page-tab-type-1 .tab-nav .tab-nav-item.tab-nav-active');
      t.removeClass('tab-nav-active')
      $(this).addClass('tab-nav-active')
      i = $(this).data('index')
      s.removeClass('active')
      s.eq(i - 1).addClass('active')
      
  })
}

// 看房团Form表单事件
var kftFormEvent = function () {
    $("#name").focusout(function () {
        if($(this).val().length < 2){
            $("#name").addClass('error');
        }else{
            $("#name").removeClass('error');
        }
    })
    $("#phone").focusout(function () {
        if($(this).val().length != 11){
            $("#phone").addClass('error');
        }else{
            $("#phone").removeClass('error');
        }
    })
    $("#qq").focusout(function () {
        if($(this).val() == ''){
            $("#qq").addClass('error');
        }else{
            $("#qq").removeClass('error');
        }
    })
    $("#kft-submit").click(function () {
        var form = $("#kftForm");
        if ($("#name").val() == ""){
            $("#name").focus();
            return false;
        }
        if ($("#phone").val() == ""){
            $("#phone").focus();
            return false;
        }
        if ($("#qq").val() == ""){
            $("#qq").focus();
            return false;
        }
        form.submit();
        return false
    })
}

var tablesBeautify = function () {
    var table = $("#history-table table");
    var tbody_tr = table.find('tbody tr');
    if(table){
        tbody_tr.each(function (index) {
            if(index == 0){
                $(this).find('font').css('color','#455571')
            }
            if(index >= 3){
                $(this).find('td:not(:first)').addClass('td04 red');
            }
        })
    }
}

var getSource = function(date){
	$.get("/business/source_data.action",{'t':'csq','date':date},function(data){
            //$.get("/business/source_data.action",{'t':'souce','date':date},function(data){
                //$(".souce_data").html(data.replace(/<font\s*[^>]*>(.*?)<\/font>/ig,"$1").replace(/style="(.*?)"/ig,"").replace("#acdeff","#ebebeb"));
				var j = $.parseJSON(data);
				if(j.type == 1){
					$("#csq_source").find('td.td02').eq(0).find('strong').text(j.sale_info.sale_house_total);//可售套数
					$("#csq_source").find('td.td02').eq(1).find('strong').text(j.sale_info.sale_residence_total);//可售面积
					$("#csq_source").find('td.td02').eq(2).find('strong').text(j.sale_info.sale_area_total);//非住宅可售套数
					$("#csq_source").find('td.td02').eq(3).find('strong').text(j.sale_info.sale_residence_area);//非住宅可售面积
					
					$("#csq_report").find('td.td02').eq(0).find('strong').text(j.sta_count.today_contract.replace("套",""));//日签约套数
					$("#csq_report").find('td.td02').eq(1).find('strong').text(j.sta_count.today_area.replace("万",""));//日签约面积
					$("#csq_report").find('td.td02').eq(2).find('strong').text(j.sta_count.month_contract.replace("套",""));//月签约套数
					$("#csq_report").find('td.td02').eq(3).find('strong').text(j.sta_count.month_area.replace("万",""));//月签约面积
				}
            },"text");
}


var getYesterday = function () {
    var day = new Date();
    var Year,Month,Day;
    var Yesterday = '';
    day.setTime(day.getTime()-24*60*60*1000); //昨天
    //初始化时间
    Year = day.getFullYear();
    Month = day.getMonth()+1;
    Day = day.getDate();
    Yesterday += Year + "";
    if (Month >= 10 )
    {
        Yesterday += Month + "";
    } else {
        Yesterday += "0" + Month + "";
    }
    if (Day >= 10 )
    {
        Yesterday += Day ;
    } else
    {
        Yesterday += "0" + Day ;
    }
    return Yesterday;
}

// 套数图表初始化
var initTsChart = function () {
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    var data1 = [Math.random() * 300]

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        data1.push(Math.round((Math.random() - 0.5) * 20 + data1[i - 1]));
    }
    var $c = echarts.init(document.getElementById('chart-ts__content'))
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data:['总套数','住宅']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:'总套数',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data
            },
            {
                name:'住宅',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: '#4e9fef'
                },
                data: data1
            }
        ]
    };
    $c.setOption(option)
}

// 统计图表初始化
var initTjChart = function () {
    var $c = echarts.init(document.getElementById('tj-chart'))
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        legend: {
            data: ['签约套数', '签约面积']
        },
        yAxis: [{
            type: 'value',
            name: '签约数(套)'
        }, {
            type: 'value',
            name: '签约面积(㎡)'
        }],
        series: [{
            name: '签约套数',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            yAxisIndex: 0,
        }, {
            name: '签约面积',
            data: [0.92, 0.92, 0.92, 0.92, 0.92, 0.92],
            type: 'line',
            itemStyle: {
                color: '#4e9fef'
            },
            yAxisIndex: 1,
        }]
    };
    $c.setOption(option)
}

//  开盘动态滚动跟随

var bindDtScroll = function () {
    var e = $('.module-city-new-pan'),
    n = 1679;
    e.length > 0 && (n = e.offset().top - 128 || 1679)
    var i = _.throttle(function () {
        var i = e.height + 127
        e.hasClass('fix-left') || e.hasClass('fix-bottom-ad') || e.length > 0 && (n = e.offset().top - 128 || 1679);
        var a = $(window).scrollTop(),
            o = $('#new-house-center').offset().top;
            console.log(a, n)
            if(a >= n) {
                if (a < o - e.height()) {
                    e.addClass('fix-left').css('top', i + 'px')
                } else {
                    e.removeClass('fix-left').css('top', '')
                }
            } else {
                e.removeClass('fix-left').css('top', '')
            }
    })
    $(window).on("scroll", i)
}

// 选项卡lazyload
function navShow(navList) {
    $("#" + navList).show();
    $("#" + navList + ' li').each(function () {
        var original = $(this).find('img.lazy').attr('data-original');
        $(this).find('img.lazy').attr('src',original);
    });
    $('#' + navList).siblings('ul').hide();
}

function getProcessTitles() {
    $.get('/ssi/index/news/news_25.json',{},function (res) {
        if(res){
            var data = res.reverse();
            var $box = $("#buy-box");
            var title_list = '';
            data.map(function (item,index,arr) {
                title_list += '<div class="buy-title"><a href="news/buying_process.action?title='+(index+1)+'">'+item.title+'</a></div>'
            });
            $box.append(title_list);
        }
    });
}
$(function () {
    if($('img.lazy').length > 0){
        $('img.lazy').lazyload({
            placeholder: "../images/2018/no_image.jpg",
            failure_limit: 10,
            effect : "fadeIn"
        });
    }
    var yester_date = getYesterday();
    getSource(yester_date);
    searchEvent(1);
    kftFormEvent();
    getProcessTitles();
    scrollNews();
    selectShow();
    scrollMenu();
    switchTab();
    initTsChart();
    initTjChart();
    bindDtScroll();

    $(".menu .item").hover(function () {
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur')
    }, function () {
        $(this).removeClass('cur');
        $('.item.shouye').addClass('cur')
    })
    $(".search-tag .tag").hover(function () {
        var data_ph = $(this).attr('data-ph');
        var data_url = $(this).attr('data-url');
        var data_index = $(this).attr('data-index');
        $(this).find('.tag').addClass('cur');
        $(this).siblings().find('.tag').removeClass('cur')
        $("#keyword").attr('placeholder',data_ph);
        $("#topSearch").attr('action', data_url).attr('index',data_index);
        searchEvent($("#topSearch").attr('index'));
    })

    $(".sale_rank .nav li").hover(function () {
        // $('img.lazy').lazyload({
        //     skip_invisible : false
        // });
        var _this = $(this);
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur')


        if (_this.hasClass('ts')) {
            $('.list.ts').show();
            $('.list.je').hide();
        }
        if (_this.hasClass('je')) {
            $('.list.ts').hide();
            $('.list.je').show();
        }

        if (_this.hasClass('esf')) {
            $('.list.esf').show();
            $('.list.zf').hide();
        }
        if (_this.hasClass('zf')) {
            $('.list.esf').hide();
            $('.list.zf').show();
        }

        if (_this.hasClass('unsale')) {
            navShow('unsale-list');
        }
        if (_this.hasClass('sale')) {
            navShow('sale-list');
        }
        if (_this.hasClass('hot')) {
            navShow('hot-list');
        }
        if (_this.hasClass('saleout')) {
            navShow('saleout-list');
        }
        if (_this.hasClass('business')) {
            navShow('bus-list');
        }

        //商业地产  选项卡
        if (_this.hasClass('shops')) {
            navShow('shops-list');
        }
        if (_this.hasClass('flat')) {
            navShow('flat-list');
        }
        if (_this.hasClass('office')) {
            navShow('office-list');
        }
        if (_this.hasClass('complex')) {
            navShow('complex-list');
        }

    })

    $(".box_con_mall li").each(function () {
        $(this).find("dl dd").eq(0).html(
            function () {
                var time = new Date($(this).html());
                return "活动倒计时<em>" + parseInt((time - new Date()) / (24 * 60 * 60 * 1000)) + "</em>天";
            });
    });
    $(".box_con_mall").slide({
        titCell: ".hd",
        targetCell: ".bd",
        effect: "slideDown",
        trigger: "click",
        switchLoad: "_src",
        delayTime: 250
    });
    $(".slide2").slide({
        mainCell: ".bd",
        autoPage: true,
        effect: "left",
        autoPlay: true,
        vis: 1,
        trigger: "click"
    });
    $('.sidebar .gzh').hover(function () {
        $("#gzh_code").show();
    },function () {
        $("#gzh_code").hide();
    })
    $('.sidebar .xcx').hover(function () {
        $("#xcx_code").show();
    },function () {
        $("#xcx_code").hide();
    });


    //住九电商抽屉式效果
    $('.c-special-list li').hover(function () {
        $(this).find('.up').hide();
        $(this).find('.down').show();
        $(this).siblings().find('.up').show();
        $(this).siblings().find('.down').hide();

    });
    //动态添加 二手房 租房左侧列表
    var esf_html = '';
    var zf_html = '';
    newsalelist = newsalelist.slice(0,10);
    newrentlist = newrentlist.slice(0,10);
    newsalelist.map( function(item,index) {
        esf_html += '<li><div><span class="name ellipsis" title="'+item.title+'"><a href="http://esf.zzjjw.cn/Resource/houseDisplay/rid/'+item.id+'.html">'+item.title+'</a></span><span class="type">'+item.room+'室'+item.hall+'厅'+item.toilet+'卫</span> <span class="acre">'+item.acre+'㎡</span> <span class="price"><span class="red">'+item.total_price+'</span>万</span></div></li>'
    })
    $("#esf-ul").append(esf_html)
    newrentlist.map( function(item,index) {
        zf_html += '<li><div><span class="name ellipsis" title="'+item.title+'"><a href="http://esf.zzjjw.cn/Rent/rentDisplay/rid/'+item.id+'.html">'+item.title+'</a></span><span class="type">'+item.room+'室'+item.hall+'厅'+item.toilet+'卫</span> <span class="acre">'+item.rent_acre+'㎡</span> <span class="price"><span class="red">'+item.rent_price+'</span>元/月</span></div></li>'
    })
    $("#zf-ul").append(zf_html)

})