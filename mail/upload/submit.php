<?php
 
// Здесь нужно сделать все проверки передаваемых файлов и вывести ошибки если нужно
 
// Переменная ответа
 
$data = array();
 
if( isset( $_GET['uploadfiles'] ) ){
    $error = false;
    $files = array();

    if (isset($_COOKIE['personalID'])) {
      $custemerID = $_COOKIE["personalID"] . '/';
    } else {
      $custemerID = '';
    }
 
    $uploaddir = './uploads/' . $custemerID; // . - текущая папка где находится submit.php
 
    // Создадим папку если её нет
 
    if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );
 
    // переместим файлы из временной директории в указанную
    foreach( $_FILES as $file ){
        if( move_uploaded_file( $file['tmp_name'], $uploaddir . basename($file['name']) ) ){
            $files[] = '/upload/' . $uploaddir . $file['name'];
        }
        else{
            $error = true;
        }
    }
 
    $data = $error ? array('error' => 'Ошибка загрузки файлов.') : array('files' => $files );
 
    echo json_encode( $data );
}
