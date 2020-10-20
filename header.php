<?php
session_start();
?>
<html>
<head>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
    <script src="https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdn.bootcss.com/font-awesome/5.10.0-12/js/all.min.js"></script>
    <script src="js/functions.js"></script>
    <link rel="stylesheet" href="css/style.css" type="text/css" media="screen"/>
</head>
<script>
        $(document).ready(function () {
            make_size();
            mouse_control();
            chose_one();
            make_ui();
            make_enemy();
            player_unit_situation();

            var time = setInterval(every_1s_function,1000);
            var time_100ms = setInterval(every_100ms_function,100);
        });
</script>
