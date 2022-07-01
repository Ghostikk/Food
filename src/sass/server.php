
<!-- берет данные с клиента превращая их в строку и снова отдает клиенту -->
<?php
$_POST = json_decode(file_get_contents('php://input'), true);
echo var_dump($_POST);