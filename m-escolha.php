<?php
require_once('../conexao.php');
$postjson = json_decode(file_get_contents('php://input'), true);


$id = @$postjson['id'];
$questao = @$postjson['questao'];
$resp = @$postjson['resp'];
$idquestao = @$postjson['idquestao'];
$radioValue = @$postjson['radioValue'];
$radioSelect = @$postjson['radioSelect'];
//  and questao = '$questao' 
//$event = @$postjson['$event'];


/* ,  resposta = '$radioValue2',  resposta = '$radioValue3' */
$res = $pdo->prepare("UPDATE checklist SET  resposta = '$idquestao'   WHERE id_agend = '$id'  and questao = ':radioSelect'  ");
 


$res->bindValue(":idquestao", $idquestao);
$res->bindValue(":radioValue", $radioValue );
$res->bindValue(":radioSelect", $radioSelect );
$res->bindValue(":resp", $resp );
//$res->bindValue(":selectedRadioGroup", $selectedRadioGroup );


$res->execute();


$result = json_encode(array('mensagem' => 'Salvo com Sucesso', 'ok' => true));
echo $result;
