'use strict';

let screen_width;
let screen_height;
let mouse_x;
let mouse_y;
let unit_group = [];
let unit_array = [];
let is_chose = false;
let frigate_number = 0;
let enemy_situation = [];
enemy_situation['id'] = [];
let player_situation = [];
player_situation['id'] = [];
let bullet_speed = 0.1;


function initialization(){
    screen_width = document.body.clientWidth;
    screen_height = document.body.clientHeight;
    
}

function player_unit_situation(){
    player_situation['id'].push('test_box');
    player_situation['test_box'] = [];
    player_situation['test_box']['hp'] = 10;
    player_situation['test_box']['fire_distance'] = 300;
    player_situation['test_box']['x'] = 0;
    player_situation['test_box']['y'] = 0;
    player_situation['test_box']['speed'] = 10;
    player_situation['test_box']['deg'] = 0;
    player_situation['test_box']['is_move'] = false;
    player_situation['test_box']['to_x'] = 0;
    player_situation['test_box']['to_y'] = 0;
    player_situation['test_box']['width'] = $('#test_box').outerWidth();
    player_situation['test_box']['height'] = $('#test_box').outerHeight();
}

function make_enemy(){
    let unit_building = "<div id='enemy_base' class='building enemy'></div>"
    $(unit_building).appendTo($("#content_border"));
    $('#enemy_base').css('top','500px');
    $('#enemy_base').css('left','1000px');
    enemy_situation['id'][0]='enemy_base';
    enemy_situation['enemy_base'] = [];
    enemy_situation['enemy_base']['hp'] = 100;
    enemy_situation['enemy_base']['fire_distance'] = 300;
    enemy_situation['enemy_base']['x'] = 0;
    enemy_situation['enemy_base']['y'] = 0;
}

function make_ui(){
    $('#build_frigate').on('click',function(){
        build('frigate');
    });
}

function login_function(){
    $('#login_background').width(screen_width);
    $('#login_background').height(screen_height);
    let login_border_width = $('#login_input_border').width();
    let login_border_height = $('#login_input_border').height();
    let login_border_left = (screen_width - login_border_width) / 2;
    let login_border_top = (screen_height - login_border_height) / 2;
    $('#login_input_border').css('left',login_border_left+'px');
    $('#login_input_border').css('top',login_border_top+'px');
    $(document).keydown(function(event){
        if(event.keyCode == 13){
            let login_name = $('#login_name').val();
            let login_password = $('#login_password').val();
            if(login_name == 'admin' && login_password == '123'){
                setCookie('admin',true);
                $('#login_background').hide();
            }
            else{
                alert('用户名或密码错误！');
                console.log(login_password);
            }
        }
    });
}

function setCookie(name,value){
	document.cookie = name + "="+ escape (value) + ";";
}

function getCookie(name){
	let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}
	else{
		return null;
	}
}

function clearCookie(name) {  
    setCookie(name, "", -1);  
} 

function exit(){
    setCookie('admin',false);
    location.reload();
}

function make_size(){
    let options_list_height = $('#options_list').outerHeight(true);
    let options_list_border_bottom_width = $('#options_list').css('borderBottomWidth');
    let content_border_left_width = $('#content_border').css('borderLeftWidth');
    options_list_border_bottom_width = options_list_border_bottom_width.substring(0,options_list_border_bottom_width.indexOf('p'));
    content_border_left_width = content_border_left_width.substring(0,content_border_left_width.indexOf('p'));
    content_border_left_width *= 2;
    let content_border_width = screen_width - content_border_left_width;
    let content_border_height = screen_height - options_list_height - options_list_border_bottom_width;
    $('#content_border').width(content_border_width);
    $('#content_border').height(content_border_height);
    $('#build_menu').height(content_border_height);
}

function mouse_control(){
    document.oncontextmenu = function() {
        return false;
    }
    $(document).click(function (e) {
        e.preventDefault();
        mouse_x = e.originalEvent.x || e.originalEvent.layerX || 0;
        mouse_y = e.originalEvent.y || e.originalEvent.layerY || 0; 
        if(!is_chose){
            unit_group = [];
            unit_array = document.querySelectorAll('.unit');
            for(let i = 0; i < unit_array.length; i++){
                $(unit_array[i]).css('border-color','#58c7ee');
            }
        }
        else{
            is_chose = false;
        }
    }); 
    let start_x = 0;
    let start_y = 0;
    $(document).mousedown(function (e) { 
        mouse_x = e.originalEvent.x || e.originalEvent.layerX || 0;
        mouse_y = e.originalEvent.y || e.originalEvent.layerY || 0;
        start_x = mouse_x;
        start_y = mouse_y;
        if(e.which == 1){
            $("<div id='mouse_rect'></div>").prependTo($("#content_border"));
        }
        else if(e.which == 3){
            move(false,false,'');
        }
    });
    $(document).mousemove(function (e) {
        mouse_x = e.originalEvent.x || e.originalEvent.layerX || 0;
        mouse_y = e.originalEvent.y || e.originalEvent.layerY || 0;
        if($('#mouse_rect').length > 0){
            if(mouse_x > start_x && mouse_y > start_y){
                $('#mouse_rect').css('top',start_y+'px');
                $('#mouse_rect').css('left',start_x+'px');
                $('#mouse_rect').width(Math.abs(mouse_x - start_x));
                $('#mouse_rect').height(Math.abs(mouse_y - start_y));
            }
            else if(mouse_x > start_x && mouse_y < start_y){
                $('#mouse_rect').css('top',mouse_y+'px');
                $('#mouse_rect').css('left',start_x+'px');
                $('#mouse_rect').width(Math.abs(mouse_x - start_x));
                $('#mouse_rect').height(Math.abs(mouse_y - start_y));
            }
            else if(mouse_x < start_x && mouse_y > start_y){
                $('#mouse_rect').css('top',start_y+'px');
                $('#mouse_rect').css('left',mouse_x+'px');
                $('#mouse_rect').width(Math.abs(mouse_x - start_x));
                $('#mouse_rect').height(Math.abs(mouse_y - start_y));
            }
            else if(mouse_x < start_x && mouse_y < start_y){
                $('#mouse_rect').css('top',mouse_y+'px');
                $('#mouse_rect').css('left',mouse_x+'px');
                $('#mouse_rect').width(Math.abs(mouse_x - start_x));
                $('#mouse_rect').height(Math.abs(mouse_y - start_y));
            }
        }
    });
    $(document).mouseup(function (e) { 
        mouse_x = e.originalEvent.x || e.originalEvent.layerX || 0;
        mouse_y = e.originalEvent.y || e.originalEvent.layerY || 0;
        if(e.which == 1 && $('#mouse_rect').length > 0){
            let position = position_chose_big(mouse_x,start_x,mouse_y,start_y);
            chose_them(position);
            $('#mouse_rect').remove();
            start_x = mouse_x;
            start_y = mouse_y;
        }
    });
}

function position_chose_big(x1, x2, y1, y2){
    let position_array = [];
    if(x1 >= x2){
        position_array[0] = x1;
        position_array[1] = x2;
    }
    else{
        position_array[0] = x2;
        position_array[1] = x1;
    }
    if(y1 >= y2){
        position_array[2] = y1;
        position_array[3] = y2;
    }
    else{
        position_array[2] = y2;
        position_array[3] = y1;
    }
    return position_array;
}

function mouse_correct(need_name){
    let mouse_array = new Array;
    let options_list_height = $('#options_list').outerHeight(true);
    let options_list_border_bottom_width = $('#options_list').css('borderBottomWidth');
    let content_border_left_width = $('#content_border').css('borderLeftWidth');
    options_list_border_bottom_width = options_list_border_bottom_width.substring(0,options_list_border_bottom_width.indexOf('p'));
    content_border_left_width = content_border_left_width.substring(0,content_border_left_width.indexOf('p'));
    let build_menu_width = $('#build_menu').outerWidth(true);

    let id_name = '#' + need_name;
    let unit_width = $(id_name).outerWidth();
    let unit_height = $(id_name).outerHeight();
    unit_width /= 2;
    unit_height /= 2;

    let map_x_min = parseInt(content_border_left_width) + unit_width;
    let map_x_max = parseInt(screen_width) - parseInt(content_border_left_width) - unit_width - parseInt(build_menu_width);
    let map_y_min = parseInt(options_list_height) + parseInt(options_list_border_bottom_width) + unit_height;
    let map_y_max = parseInt(screen_height) - parseInt(content_border_left_width) - unit_height;
    let mouse_x_correct = 0;
    let mouse_y_correct = 0;
    if(mouse_x < map_x_min){
        mouse_x_correct = map_x_min;
    }
    else if(mouse_x > map_x_max){
        mouse_x_correct = map_x_max;
    }
    else{
        mouse_x_correct = mouse_x;
    }
    if(mouse_y < map_y_min){
        mouse_y_correct = map_y_min;
    }
    else if(mouse_y > map_y_max){
        mouse_y_correct = map_y_max;
    }
    else{
        mouse_y_correct = mouse_y;
    }
    mouse_x_correct -= unit_width;
    mouse_y_correct -= unit_height;
    mouse_array[0] = mouse_x_correct;
    mouse_array[1] = mouse_y_correct;
    return mouse_array;
}

function move_action(need_x,need_y,need_name){
    let id_name = '#' + need_name;
    let now_x = player_situation[need_name]['x'];
    let now_y = player_situation[need_name]['y'];
    let x = Math.pow((now_x - need_x),2);
    let y = Math.pow((now_y - need_y),2);
    let distance = Math.sqrt((x+y));
    let speed = distance / player_situation[need_name]['speed'];
    speed *= 100;
    player_situation[need_name]['is_move'] = true;
    player_situation[need_name]['to_x'] = need_x;
    player_situation[need_name]['to_y'] = need_y;
    $(id_name).stop();
    $(id_name).animate({
        top: need_y+'px',
        left: need_x+'px',
    },speed,'linear',function () {
        player_situation[need_name]['is_move'] = false;
    });
    let deg = 0;
    if(now_x == need_x && need_y < now_y){
        deg = -90;
    }
    else if(now_x == need_x && need_y > now_y){
        deg = 90;
    }
    else {
        let tan = (need_y - now_y) / (need_x - now_x);
        let tan_deg = Math.atan(tan);
        deg = tan_deg * 180 / Math.PI;
        if(need_y < now_y && need_x < now_x){
            deg -= 180;
        }
        else if(need_y > now_y && need_x < now_x){
            deg += 180;
        }
    }
    player_situation[need_name]['deg'] = deg;
    $(id_name).css('transform','rotate('+deg+'deg)');
}

function move(need_x,need_y,need_name){
    if(need_x && need_y && need_name != null){
        move_action(need_x,need_y,need_name);
    }
    else {
        if(unit_group.length > 0){
            for(let i = 0; i < unit_group.length; i++){
                for(let ii = 0; ii < player_situation['id'].length; ii++){
                    if(player_situation['id'][ii] == unit_group[i]){
                        let mouse_co = mouse_correct(unit_group[i]);
                        let mouse_x_correct = mouse_co[0];
                        let mouse_y_correct = mouse_co[1];
                        let id = player_situation['id'][ii];
                        move_action(mouse_x_correct,mouse_y_correct,id);
                    }
                }
            }
        }
    }
}

function check_rigid() {
    for(let i = 0; i < player_situation['id'].length; i++){
        let id = player_situation['id'][i];
        if(player_situation[id]['is_move']){
            let deg = player_situation[id]['deg'];
            let out_width = player_situation[id]['width'];
            let out_height = player_situation[id]['height'];
            let duijiao = Math.sqrt(Math.pow(out_width / 2,2) + Math.pow(out_height / 2,2));
            for(let ii = 0; ii < player_situation['id'].length; ii++){
                if(id != player_situation['id'][ii]){
                    let id_another = player_situation['id'][ii];
                    let distance_true = Math.sqrt(Math.pow((player_situation[id]['x'] - player_situation[id_another]['x']),2) + Math.pow((player_situation[id]['y'] - player_situation[id_another]['y']),2));
                    let deg_another = player_situation[id_another]['deg'];
                    let deg_between = Math.atan((player_situation[id_another]['y'] - player_situation[id]['y']) / (player_situation[id_another]['x'] - player_situation[id]['x']));
                    let out_width_another = player_situation[id_another]['width'];
                    let out_height_another = player_situation[id_another]['height'];
                    let duijiao_another = Math.sqrt(Math.pow(out_width_another / 2,2) + Math.pow(out_height_another / 2,2));
                    deg_between = deg_between * 180 / Math.PI;
                    console.log('主动角度'+deg);
                    console.log('被动角度'+deg_another);
                    console.log('连线角度'+deg_between);
                    let deg_need_1 = Math.abs(deg - deg_between);
                    let deg_need_2 = Math.abs(deg_another - deg_between);
                    let distance_another = 0;
                    let distance = 0;
                    if(deg_need_2 == 90 || deg_need_2 == 270 || deg_need_2 == -90 || deg_need_2 == -270){
                        distance_another = player_situation[id_another]['height'] / 2;
                    }
                    else{
                        deg_need_2 = deg_need_2 * Math.PI / 180;
                        distance_another = player_situation[id_another]['width'] / 2 / Math.abs(Math.cos(deg_need_2));
                        if(distance_another > duijiao_another){
                            let chang_zhijiao_another = player_situation[id_another]['width'] / 2 * Math.abs(Math.tan(deg_need_2));
                            distance_another = player_situation[id_another]['height'] / 2 / chang_zhijiao_another * distance_another;
                        }
                    }
                    if(deg_need_1 == 90 || deg_need_1 == 270 || deg_need_1 == -90 || deg_need_1 == -270){
                        distance = player_situation[id]['height'] / 2;
                    }
                    else{
                        deg_need_1 = deg_need_1 * Math.PI / 180;
                        distance = player_situation[id]['width'] / 2 / Math.abs(Math.cos(deg_need_1));
                        if(distance > duijiao){
                            console.log('主动对角'+duijiao);
                            let chang_zhijiao = player_situation[id]['width'] / 2 * Math.abs(Math.tan(deg_need_1));
                            distance = player_situation[id]['height'] / 2 / chang_zhijiao * distance;
                        }
                    }
                    let distance_limit = distance + distance_another;
                    console.log('实际'+distance_true);
                    console.log('主动'+distance);
                    console.log('被动'+distance_another);
                    console.log('');
                    if(distance_limit >= distance_true){
                        let id_name = '#' + id;
                        $(id_name).stop();
                        player_situation[id]['is_move'] = false;
                    }
                }
            }
        }
    }
}

function chose_one(){
    unit_array = document.querySelectorAll('.unit');
    for(let i = 0; i < unit_array.length; i++){
        $(unit_array[i]).click(function(){
            unit_group = new Array;
            for(let ii = 0; ii < unit_array.length; ii++){
                $(unit_array[ii]).css('border-color','#58c7ee');
            }
            let id = this.getAttribute('id');
            unit_group.push(id);
            $(this).css('border-color','red');
            is_chose = true;
        });
    }
}

function chose_them(array){
    unit_array = document.querySelectorAll('.unit');
    unit_group = [];
    for(let i = 0; i < unit_array.length; i++){
        let id = unit_array[i].getAttribute('id');
        let x = player_situation[id]['x'];
        let y = player_situation[id]['y'];
        if(x <= array[0] && x >= array[1] && y <= array[2] && y >= array[3]){
            unit_group.push(id);
            $(unit_array[i]).css('border-color','red');
            is_chose = false;
        }
    }
}

function build(name){
    let unit_1 = "<div id='";
    let unit_2 ="";
    let unit_3 = "' class='unit frigate'>";
    let unit_4 = "</div>";
    if(name == 'frigate'){
        frigate_number++;
        unit_2 = name + '_' + frigate_number;
        player_situation['id'].push(unit_2);
        player_situation[unit_2] = [];
        player_situation[unit_2]['x'] = 0;
        player_situation[unit_2]['y'] = 0;
        player_situation[unit_2]['speed'] = 10;
        player_situation[unit_2]['hp'] = 10;
        player_situation[unit_2]['fire_distance'] = 300;
        player_situation[unit_2]['deg'] = 0;
        player_situation[unit_2]['is_move'] = false;
        player_situation[unit_2]['to_x'] = 0;
        player_situation[unit_2]['to_y'] = 0;
    }
    $(unit_1 + unit_2 + unit_3 + unit_2 + unit_4).appendTo($("#content_border"));
    player_situation[unit_2]['width'] = $('#' + unit_2).outerWidth();
    player_situation[unit_2]['height'] = $('#'+unit_2).outerHeight();
    chose_one();
}

function every_1s_function(){
    battle();

}

function  every_100ms_function(){
    find_position();
    check_rigid();
}

function battle(){
    if(player_situation['id'].length < 0){
        return
    }
    for(let i = 0; i < player_situation['id'].length; i++){
        let id_name_string = player_situation['id'][i];
        let id_name = '#' + player_situation['id'][i];
        let x = $(id_name).offset().top;
        let y = $(id_name).offset().left;
        for(let ii = 0; ii < enemy_situation['id'].length; ii++){
            let e_id_name_string = enemy_situation['id'][ii];
            let e_id_name = '#' + enemy_situation['id'][ii];
            let e_x = $(e_id_name).offset().top;
            let e_y = $(e_id_name).offset().left;
            let distance = Math.sqrt(Math.pow((x - e_x),2) + Math.pow((y - e_y),2));
            if(distance <= player_situation[id_name_string]['fire_distance']){
                let need_time = distance / bullet_speed;
                let bullet_div = document.createElement('div');
                $(bullet_div).addClass("bullet");
                $(bullet_div).css('top',player_situation[id_name_string]['y']);
                $(bullet_div).css('left',player_situation[id_name_string]['x']);
                $(bullet_div).appendTo($("#content_border"));
                bullet_action(bullet_div, need_time, enemy_situation[e_id_name_string]['x'], enemy_situation[e_id_name_string]['y'])
            }
        }
    }
}

function bullet_action(bullet_div, need_time, target_x, target_y){
    $(bullet_div).animate({
        top: target_y+'px',
        left: target_x+'px',
    },need_time,'linear',function(){
        $(bullet_div).remove();
    });
}

function find_position(){
    for(let i = 0; i < player_situation['id'].length; i++){
        let id_name_string = player_situation['id'][i];
        let id_name = '#' + id_name_string;
        let y = $(id_name).css('top');
        let x = $(id_name).css('left');
        x = x.substring(0,x.indexOf('p'));
        y = y.substring(0,y.indexOf('p'));
        let out_width = $(id_name).outerWidth();
        let out_height = $(id_name).outerHeight();
        x = parseInt(x) + parseInt(out_width / 2);
        y = parseInt(y) + parseInt(out_height / 2);
        player_situation[id_name_string]['x'] = Math.round(x);
        player_situation[id_name_string]['y'] = Math.round(y);
    }
    for(let i = 0; i < enemy_situation['id'].length; i++){
        let id_name_string = enemy_situation['id'][i];
        let id_name = '#' + id_name_string;
        let y = $(id_name).css('top');
        let x = $(id_name).css('left');
        x = x.substring(0,x.indexOf('p'));
        y = y.substring(0,y.indexOf('p'));
        let out_width = $(id_name).outerWidth();
        let out_height = $(id_name).outerHeight();
        x = parseInt(x) + parseInt(out_width / 2);
        y = parseInt(y) + parseInt(out_height / 2);
        enemy_situation[id_name_string]['x'] = Math.round(x);
        enemy_situation[id_name_string]['y'] = Math.round(y);
    }
}