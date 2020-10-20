<?php
include 'header.php';
?>

<body>
    <script>
        initialization();
    </script>
    <?php
    if(!isset($_COOKIE['admin']) || $_COOKIE['admin'] != 'true'){
        include 'login.php';
    }
    ?>
    <div id='screen_border'>
        <div id='options_list'>
            <ul id='options_list_right'>
                <li class='olr_li'>
                    <input id='exit_button' class='options_buttons' type='button' value='退出' onclick='exit()'>
                </li>
            </ul>
        </div>
        <div id='content_border'>
            <div id='build_menu'>
                <ul id='build_menu_list'>
                    <li class='bml_li'><input id='build_frigate' class='menu_buttons' type='button' value='护卫舰'></li>
                </ul>

            </div>
            <div id = 'test_box' class='unit'>test</div>
        </div>    
    </div>
</body>
</html>