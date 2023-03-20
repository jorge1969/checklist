<?php
require_once('../conexao.php');
$postjson = json_decode(file_get_contents('php://input'), true);

$limite = intVal($postjson['limit']);
$start = intVal($postjson['start']);
$idUsuario= @$postjson['idUsuario'];
$epoca = @$postjson['epoca'];
$tipo = @$postjson['tipo'];
$busca = '%' . $postjson['nome'] . '%';





$query = $pdo->query("SELECT * FROM questoes where 	id LIKE '$busca' and estilo = 'M_Escolha' and tipo_equip = '$tipo' and periodo = '$epoca' order by id desc  limit $start, $limite");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_reg = @count($res);
if ($total_reg > 0) {

    for ($i = 0; $i < $total_reg; $i++) {
        foreach ($res[$i] as $key => $value) {
        }

        $id = $res[$i]['id'];
        $questao = $res[$i]['questao'];
        $tipo_equip = $res[$i]['tipo_equip'];
        $periodo = $res[$i]['periodo']; 
        $estilo = $res[$i]['estilo'];
        $id_cliente = $res[$i]['id_cliente'];
        

        $dados[] = array(
            'idquestao' => $id,
            'questao' => $questao,
            'tipo_equip ' => $tipo_equip ,
            'periodo' => $periodo,
            'estilo' => $estilo,
            'id_cliente' => $id_cliente,
            
        );
    }

    $result = json_encode(array('itens' => $dados));
    echo $result;
} else {
    $result = json_encode(array('itens' => '0'));
    echo $result;
}
