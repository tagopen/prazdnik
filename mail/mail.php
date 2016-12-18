<?php
  if (is_file('../lib/class.phpmailer.php')) {
    require_once("../lib/class.phpmailer.php");
  }

  if (is_file('../lib/class.smtp.php')) {
    require_once("../lib/class.smtp.php");
  }

  $http_host = $_SERVER['HTTP_HOST'];

  if ( substr($http_host, 0, 4)=='www.') {
    $host_name = substr($http_host, 4);
  } else {
    $host_name = $http_host;
  }

  define ('HTTP_SERVER', 'http://' . $http_host . '/');
  define ('HOST_NAME', $host_name);

  $post = array( 
    'host_name'     => HOST_NAME,
    'host_dir'      => HTTP_SERVER,
    );

  if (!empty($_POST["user_form"])) {
    $post['user_form'] = filter_input(INPUT_POST, 'user_form', FILTER_SANITIZE_EMAIL);
  }

  if (!empty($_POST["user_customerID"])) {
    $post['user_customerID'] = filter_input(INPUT_POST, 'user_customerID', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_package"])) {
    $post['user_package'] = filter_input(INPUT_POST, 'user_package', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_filename"])) {
    $post['user_filename'] = filter_input(INPUT_POST, 'user_filename', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_childrean"])) {
    $post['user_childrean'] = filter_input(INPUT_POST, 'user_childrean', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_photo"])) {
    $post['user_photo'] = filter_input(INPUT_POST, 'user_photo', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_name"])) {
    $post['user_name'] = filter_input(INPUT_POST, 'user_name', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["user_email"])) {
    $post['user_email'] = filter_input(INPUT_POST, 'user_email', FILTER_SANITIZE_EMAIL);
  }

  if (!empty($_POST["user_phone"])) {
    $post['user_phone'] = filter_input(INPUT_POST,'user_phone', FILTER_SANITIZE_STRING);
  }

  if (!empty($_POST["child1_name"])) {
    $post['child1_name'] = filter_input(INPUT_POST,'child1_name', FILTER_SANITIZE_STRING);
  } else {
    $post['child1_name'] = false;
  }

  if (!empty($_POST["child2_name"])) {
    $post['child2_name'] = filter_input(INPUT_POST,'child2_name', FILTER_SANITIZE_STRING);
  } else {
    $post['child2_name'] = false;
  }

  if (!empty($_POST["user_promo"])) {
    $post['user_promo'] = filter_input(INPUT_POST,'user_promo', FILTER_SANITIZE_STRING);
  } else {
    $post['user_promo'] = false;
  }
  if (!empty($_POST["user_fullcost"])) {
    $post['user_fullcost'] = filter_input(INPUT_POST,'user_fullcost', FILTER_SANITIZE_STRING);
  } else {
    $post['user_fullcost'] = false;
  }

  // Insert form data into html
  $patterns = array();
  $replacements = array();
  foreach ($post as $key => $value) {
    $patterns[] = '/\{%' . $key .  '\%}/i'; // varible => {$varible}
    $replacements[] = $value;
  }

  // html template
  $body = '';
  if (is_file('html_template.html')) {
    $html_template = file_get_contents('html_template.html');
    $body = preg_replace($patterns, $replacements, $html_template);  
    $body = preg_replace('/\{%(.+)%\}/', '', $body); // remove all beetween "{% %}"
  }

  // If mailer not supported html
  $altBody = '';
  if (is_file('no_html.html')) {
    $no_html_template = file_get_contents('no_html.html');
    $altBody = preg_replace($patterns, $replacements, $no_html_template);
    $altBody = preg_replace('/\{%(.+)%\}/', '', $altBody); // remove all beetween "{% %}"
  }
  $mail = new PHPMailer();

  $mail->CharSet      = 'UTF-8';

  //if mail is SMTP
  /*
  $mail->isSMTP();
  $mail->Host         = 'smtp.server.com';
  $mail->SMTPAuth     = true;
  $mail->SMTPSecure   = 'ssl';
  $mail->Port         = 465;
  $mail->Username     = 'name@mail.com';
  $mail->Password     = 'password';
  */

  $mail->IsSendmail();

  $from = 'no-reply@tagopen.com';
  $to = "Artem2431@gmail.com";
  $mail->SetFrom($from, HOST_NAME);
  $mail->AddAddress($to, 'Name Surname');

  $mail->isHTML(false);
 
  $mail->AddAttachment(getcwd() . '/upload/uploads/'. $post['user_customerID']. '/'. $post['user_filename'], $post['user_filename']); // добавляем вложение

  $mail->Subject      = "Новая заявка с сайта";
  $mail->Body         = $body;
  $mail->AltBody      = $altBody;

  if(!$mail->send()) {
    echo 'Что-то пошло не так. ' . $mail->ErrorInfo;
    return false;
  } else {
    echo 'Сообщение отправлено';
    return true;
  }

?>