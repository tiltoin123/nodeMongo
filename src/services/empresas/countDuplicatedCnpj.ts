db.empresas.aggregate([
    {
        // Agrupa os documentos pelo campo que você quer verificar duplicados
        $group: {
            _id: "$cnpj", // Campo para agrupar, neste caso, 'cnpj'
            count: { $sum: 1 } // Conta o número de ocorrências de cada valor
        }
    },
    {
        // Filtra os grupos que têm mais de um documento (ou seja, são duplicados)
        $match: {
            count: { $gt: 1 } // Somente grupos com mais de um documento
        }
    },
    {
        // Opcional: ordena os resultados para facilitar a leitura
        $sort: { count: -1 }
    }
]);
